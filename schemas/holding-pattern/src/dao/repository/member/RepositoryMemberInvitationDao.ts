import { IContext, Injected } from "@airport/direction-indicator";
import { IRepositoryMemberInvitation } from "@airport/ground-control";
import { BaseRepositoryMemberInvitationDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_holding_dash_pattern from "../../../generated/qApplication";
import { QRepositoryMemberInvitation } from "../../../generated/qInterfaces";

@Injected()
export class RepositoryMemberInvitationDao
    extends BaseRepositoryMemberInvitationDao {

    async insert(
        repositoryMemberInvitations: IRepositoryMemberInvitation[],
        context: IContext
    ): Promise<void> {
        let rmi: QRepositoryMemberInvitation
        const VALUES = []
        for (const repositoryMemberInvitation of repositoryMemberInvitations) {
            VALUES.push([
                repositoryMemberInvitation.createdAt,
                repositoryMemberInvitation.invitationPublicSigningKey,
                repositoryMemberInvitation.invitedRepositoryMember._localId,
                repositoryMemberInvitation.addedInRepositoryTransactionHistory._localId
            ])
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: rmi = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMemberInvitation,
            columns: [
                rmi.createdAt,
                rmi.invitationPublicSigningKey,
                rmi.invitedRepositoryMember._localId,
                rmi.addedInRepositoryTransactionHistory._localId
            ],
            VALUES
        }, context)
        for (let i = 0; i < repositoryMemberInvitations.length; i++) {
            let repositoryMemberInvitation = repositoryMemberInvitations[i]
            repositoryMemberInvitation._localId = _localIds[i][0]
        }
    }

}
