"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const __1 = require("../..");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionHistoryUpdateStageDao extends __1.BaseRepositoryTransactionHistoryUpdateStageDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RepositoryTransactionHistoryUpdateStage;
        let rthus;
        return await this.airDb.db.insertValues(dbEntity, {
            insertInto: rthus = generated_1.Q.RepositoryTransactionHistoryUpdateStage,
            columns: [
                rthus.repositoryTransactionHistoryId,
                rthus.blockId
            ],
            values
        });
    }
    async updateRepositoryTransactionHistory() {
        const schemaName = '@airport/holding-pattern';
        const dbEntity = this.airDb.schemaMapByName[schemaName]
            .currentVersion.entityMapByName['RepositoryTransactionHistory'];
        const rth = this.airDb.qSchemaMapByName[schemaName].RepositoryTransactionHistory;
        let rthus;
        return await this.airDb.db.updateWhere(dbEntity, {
            update: rth,
            set: {
                blockId: air_control_1.field({
                    from: [
                        rthus = generated_1.Q.RepositoryTransactionHistoryUpdateStage
                    ],
                    select: rthus.blockId,
                    where: rthus.repositoryTransactionHistoryId.equals(rth.id)
                })
            }
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.RepositoryTransactionHistoryUpdateStage
        });
    }
}
exports.RepositoryTransactionHistoryUpdateStageDao = RepositoryTransactionHistoryUpdateStageDao;
di_1.DI.set(__1.REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, RepositoryTransactionHistoryUpdateStageDao);
//# sourceMappingURL=RepositoryTransactionHistoryUpdateStageDao.js.map