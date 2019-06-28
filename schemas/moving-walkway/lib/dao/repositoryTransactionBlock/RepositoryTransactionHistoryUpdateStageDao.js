"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const generated_1 = require("../../generated/generated");
const diTokens_1 = require("../../diTokens");
const generated_2 = require("../../generated/generated");
class RepositoryTransactionHistoryUpdateStageDao extends generated_1.BaseRepositoryTransactionHistoryUpdateStageDao {
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
        const repoTransHistoryDao = await di_1.DI.get(holding_pattern_1.REPO_TRANS_HISTORY_DAO);
        return await repoTransHistoryDao.setBlockIdWhereId((idField) => air_control_1.field({
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
            deleteFrom: generated_2.Q.RepositoryTransactionHistoryUpdateStage
        });
    }
}
exports.RepositoryTransactionHistoryUpdateStageDao = RepositoryTransactionHistoryUpdateStageDao;
di_1.DI.set(diTokens_1.REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, RepositoryTransactionHistoryUpdateStageDao);
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStageDao.js.map