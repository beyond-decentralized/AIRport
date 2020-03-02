"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
const index_1 = require("../../index");
class RecordHistoryOldValueDao extends generated_1.BaseRecordHistoryOldValueDao {
    async findByRecordHistoryIdIn(recordHistoryIds) {
        let rhov;
        return await this.db.find.tree({
            select: {},
            from: [
                rhov = index_1.Q.RecordHistoryOldValue
            ],
            where: rhov.recordHistory.id.in(recordHistoryIds)
        });
    }
}
exports.RecordHistoryOldValueDao = RecordHistoryOldValueDao;
di_1.DI.set(tokens_1.REC_HIST_OLD_VALUE_DAO, RecordHistoryOldValueDao);
//# sourceMappingURL=RecordHistoryOldValueDao.js.map