import { UserAccount_PublicSigningKey, UserAccount_LocalId } from "@airport/aviation-communication";
import { IContext, Injected } from "@airport/direction-indicator";
import { IRepositoryMember, IRepositoryTransactionHistory, RepositoryMemberInvitation_PublicSigningKey, RepositoryMember_PublicSigningKey, RepositoryMember_Status, Repository_LocalId } from "@airport/ground-control";
import { AND, EXISTS, Y } from "@airport/tarmaq-query";
import { QUserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle";
import { QRepository, QRepositoryMember, QRepositoryMemberInvitation } from "../../../generated/qInterfaces";
import { BaseRepositoryMemberDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_holding_dash_pattern from "../../../generated/qApplication";

@Injected()
export class RepositoryMemberDao
    extends BaseRepositoryMemberDao {

    async findByMemberPublicSigningKeys(
        memberPublicSigningKeys: RepositoryMember_PublicSigningKey[],
        context: IContext
    ): Promise<IRepositoryMember[]> {
        let rm: QRepositoryMember

        return await this._find({
            SELECT: {
                '*': Y,
                userAccount: {}
            },
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                rm.userAccount.LEFT_JOIN()
            ],
            WHERE: rm.memberPublicSigningKey.IN(memberPublicSigningKeys)
        }, context)
    }

    async findForRepositoryLocalIdAndAccountPublicSingingKey(
        repositoryLocalId: Repository_LocalId,
        accountPublicSigningKey: UserAccount_PublicSigningKey,
        context: IContext
    ): Promise<IRepositoryMember> {
        let rm: QRepositoryMember,
            ua: QUserAccount

        return await this._findOne({
            SELECT: {},
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                ua = rm.userAccount.LEFT_JOIN()
            ],
            WHERE: AND(
                rm.repository.equals(repositoryLocalId),
                ua.accountPublicSigningKey.equals(accountPublicSigningKey)
            )
        }, context)
    }

    async findForRepositoryLocalIdsAndUserLocalId(
        repositoryLocalId: Repository_LocalId[],
        userLocalId: UserAccount_LocalId,
        context: IContext
    ): Promise<IRepositoryMember[]> {
        let rm: QRepositoryMember
        let r: QRepository

        return await this._find({
            SELECT: {},
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                r = rm.repository.INNER_JOIN()
            ],
            WHERE: AND(
                r._localId.IN(repositoryLocalId),
                rm.userAccount.equals(userLocalId)
            )
        }, context)
    }

    async findForRepositoryLocalIdAndIvitationPublicSigningKey(
        repositoryLocalId: Repository_LocalId,
        base64EncodedKeyInvitationPublicSigningKey: RepositoryMemberInvitation_PublicSigningKey,
        context: IContext
    ): Promise<IRepositoryMember> {
        let rm: QRepositoryMember,
            rmi: QRepositoryMemberInvitation

        return await this._findOne({
            SELECT: {},
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                rmi = rm.invitations.LEFT_JOIN()
            ],
            WHERE: AND(
                rm.repository.equals(repositoryLocalId),
                rmi.invitationPublicSigningKey.equals(base64EncodedKeyInvitationPublicSigningKey)
            )
        }, context)
    }

    async insert(
        repositoryMembers: IRepositoryMember[],
        context: IContext
    ): Promise<void> {
        let rm: QRepositoryMember
        const VALUES = []
        for (const repositoryMember of repositoryMembers) {
            VALUES.push([
                repositoryMember.isOwner,
                repositoryMember.isAdministrator, repositoryMember.canWrite,
                repositoryMember.memberPublicSigningKey, repositoryMember.status,
                repositoryMember.repository._localId,
                repositoryMember.userAccount._localId,
            ])
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
            columns: [
                rm.isOwner,
                rm.isAdministrator,
                rm.canWrite,
                rm.memberPublicSigningKey,
                rm.status,
                rm.repository._localId,
                rm.userAccount._localId
            ],
            VALUES
        }, {
            ...context,
            generateOnSync: true
        })
        for (let i = 0; i < repositoryMembers.length; i++) {
            let repositoryMember = repositoryMembers[i]
            repositoryMember._localId = _localIds[i][0]
        }
    }

    async updatePublicSigningKey(
        invitationPublicSigningKey: RepositoryMemberInvitation_PublicSigningKey,
        memberPublicSigningKey: RepositoryMember_PublicSigningKey,
        context: IContext
    ): Promise<void> {
        let rm: QRepositoryMember,
            rmi: QRepositoryMemberInvitation;

        await this.db.updateColumnsWhere({
            UPDATE: rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
            SET: {
                MEMBER_PUBLIC_SIGNING_KEY: memberPublicSigningKey,
                STATUS: RepositoryMember_Status.JOINED
            },
            WHERE: EXISTS({
                FROM: [
                    rmi = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMemberInvitation
                ],
                SELECT: rmi._localId,
                WHERE: AND(
                    rmi.invitedRepositoryMember._localId.equals(rm._localId),
                    rmi.invitationPublicSigningKey.equals(invitationPublicSigningKey)
                )
            })
        }, context)
    }

    async updateAddedInRepositoryTransactionHistory(
        repositoryMembers: IRepositoryMember[],
        repositoryTransactionHistory: IRepositoryTransactionHistory,
        context: IContext
    ): Promise<void> {
        let rm: QRepositoryMember;

        await this.db.updateColumnsWhere({
            UPDATE: rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
            SET: {
                ADDED_IN_REPOSITORY_TRANSACTION_HISTORY_LID: repositoryTransactionHistory._localId
            },
            WHERE: rm._localId.IN(
                repositoryMembers.map(repositoryMember => repositoryMember._localId)
            )
        }, context)
    }
}
