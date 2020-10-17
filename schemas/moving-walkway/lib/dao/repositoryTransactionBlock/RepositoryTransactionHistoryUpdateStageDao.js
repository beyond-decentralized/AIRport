import { field } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { REPO_TRANS_HISTORY_DAO } from '@airport/holding-pattern';
import { BaseRepositoryTransactionHistoryUpdateStageDao } from '../../generated/generated';
import { REPO_TRANS_HISTORY_UPDATE_STAGE_DAO } from '../../tokens';
import { Q } from '../../generated/generated';
export class RepositoryTransactionHistoryUpdateStageDao extends BaseRepositoryTransactionHistoryUpdateStageDao {
    async insertValues(values) {
        const rthus = this.db.from;
        return await this.db.insertValues({
            insertInto: rthus,
            columns: [
                rthus.repositoryTransactionHistoryId,
                rthus.blockId
            ],
            values
        });
    }
    async updateRepositoryTransactionHistory() {
        const rthus = this.db.from;
        const repoTransHistoryDao = await container(this).get(REPO_TRANS_HISTORY_DAO);
        return await repoTransHistoryDao.setBlockIdWhereId((idField) => field({
            from: [
                rthus
            ],
            select: rthus.blockId,
            where: rthus.repositoryTransactionHistoryId.equals(idField)
        }));
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: Q.RepositoryTransactionHistoryUpdateStage
        });
    }
}
DI.set(REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, RepositoryTransactionHistoryUpdateStageDao);
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStageDao.js.map