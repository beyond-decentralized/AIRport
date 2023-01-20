import { UserAccount_Email, UserAccount_LocalId } from "@airport/aviation-communication";
import { IContext, Injected } from "@airport/direction-indicator";
import { IRepositoryMember, RepositoryMember_GUID, RepositoryMember_PublicSigningKey, RepositoryMember_Status, Repository_LocalId } from "@airport/ground-control";
import { AND, OR, Y } from "@airport/tarmaq-query";
import { QUserAccount } from "@airport/travel-document-checkpoint";
import { QRepositoryMember } from "../../generated/qInterfaces";
import { BaseRepositoryMemberDao } from "../../generated/baseDaos";
import Q_airport____at_airport_slash_holding_dash_pattern from "../../generated/qApplication";

@Injected()
export class RepositoryMemberDao
    extends BaseRepositoryMemberDao {

    async findByGUIDs(
        repositoryMemberGUIDs: RepositoryMember_GUID[]
    ): Promise<IRepositoryMember[]> {
        let rm: QRepositoryMember,
            ua: QUserAccount

        return await this._find({
            SELECT: {
                '*': Y,
                userAccount: {}
            },
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                ua = rm.userAccount.LEFT_JOIN()
            ],
            WHERE: rm.GUID.IN(repositoryMemberGUIDs)
        })
    }

    async findForRepositoryLocalIdAndUserEmail(
        repositoryLocalId: Repository_LocalId,
        userEmail: UserAccount_Email
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
                ua.email.equals(userEmail)
            )
        })
    }

    async findForRepositoryLocalIdAndUserLocalId(
        repositoryLocalId: Repository_LocalId,
        userLocalId: UserAccount_LocalId
    ): Promise<IRepositoryMember> {
        let rm: QRepositoryMember

        return await this._findOne({
            SELECT: {},
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember
            ],
            WHERE: AND(
                rm.repository.equals(repositoryLocalId),
                rm.repository.equals(repositoryLocalId),
                rm.userAccount.equals(userLocalId)
            )
        })
    }

    async insert(
        repositoryMembers: IRepositoryMember[],
        context: IContext
    ): Promise<void> {
        let rm: QRepositoryMember
        const VALUES = []
        for (const repositoryMember of repositoryMembers) {
            VALUES.push([
                repositoryMember.GUID, repositoryMember.isOwner,
                repositoryMember.isAdministrator, repositoryMember.canWrite,
                repositoryMember.publicSigningKey, repositoryMember.status,
                repositoryMember.repository._localId,
                repositoryMember.userAccount._localId,
            ])
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
            columns: [
                rm.GUID,
                rm.isOwner,
                rm.isAdministrator,
                rm.canWrite,
                rm.publicSigningKey,
                rm.status,
                rm.repository._localId,
                rm.userAccount._localId
            ],
            VALUES
        }, context)
        for (let i = 0; i < repositoryMembers.length; i++) {
            let repositoryMember = repositoryMembers[i]
            repositoryMember._localId = _localIds[i][0]
        }
    }

    async updatePublicSigningKey(
        repositoryMemberGUID: RepositoryMember_GUID,
        publicSigningKey: RepositoryMember_PublicSigningKey,
        context?: IContext
    ): Promise<void> {
        let rm: QRepositoryMember;

        await this.db.updateColumnsWhere({
            UPDATE: rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
            SET: {
                PUBLIC_SIGNING_KEY: publicSigningKey,
                STATUS: RepositoryMember_Status.JOINED
            },
            WHERE: rm.GUID.equals(repositoryMemberGUID)
        }, context)
    }

}
