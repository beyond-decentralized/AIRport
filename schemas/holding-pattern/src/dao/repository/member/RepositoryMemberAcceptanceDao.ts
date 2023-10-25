import { IContext, Injected } from "@airport/direction-indicator";
import { IRepositoryMemberAcceptance, IRepositoryTransactionHistory } from "@airport/ground-control";
import { BaseRepositoryMemberAcceptanceDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_holding_dash_pattern from "../../../generated/qApplication";
import { QRepositoryMemberAcceptance } from "../../../generated/qInterfaces";

@Injected()
export class RepositoryMemberAcceptanceDao
    extends BaseRepositoryMemberAcceptanceDao {

    async insert(
        repositoryMemberAcceptances: IRepositoryMemberAcceptance[],
        context: IContext
    ): Promise<void> {
        let rma: QRepositoryMemberAcceptance
        const VALUES = []
        for (const repositoryMemberAcceptance of repositoryMemberAcceptances) {
            VALUES.push([
                repositoryMemberAcceptance.createdAt,
                repositoryMemberAcceptance.acceptingRepositoryMember._localId,
                repositoryMemberAcceptance.addedInRepositoryTransactionHistory._localId
            ])
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: rma = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMemberAcceptance,
            columns: [
                rma.createdAt,
                rma.acceptingRepositoryMember._localId,
                rma.addedInRepositoryTransactionHistory._localId
            ],
            VALUES
        }, {
            ...context,
            generateOnSync: true
        })
        for (let i = 0; i < repositoryMemberAcceptances.length; i++) {
            let repositoryMemberAcceptance = repositoryMemberAcceptances[i]
            repositoryMemberAcceptance._localId = _localIds[i][0]
        }
    }

    async updateAddedInRepositoryTransactionHistory(
        repositoryMemberAcceptances: IRepositoryMemberAcceptance[],
        repositoryTransactionHistory: IRepositoryTransactionHistory,
        context: IContext
    ): Promise<void> {
        let rma: QRepositoryMemberAcceptance;

        await this.db.updateColumnsWhere({
            UPDATE: rma = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMemberAcceptance,
            SET: {
                ADDED_IN_REPOSITORY_TRANSACTION_HISTORY_LID: repositoryTransactionHistory._localId
            },
            WHERE: rma._localId.IN(
                repositoryMemberAcceptances.map(repositoryMemberAcceptance =>
                    repositoryMemberAcceptance._localId)
            )
        }, context)
    }

}
