"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryNewValueDao extends generated_1.BaseRecordHistoryNewValueDao {
    async findByRecordHistoryIdIn(recordHistoryIds) {
        let rhnv;
        return await this.db.find.tree({
            select: {},
            from: [
                rhnv = generated_1.Q.RecordHistoryNewValue
            ],
            where: rhnv.recordHistory.id.in(recordHistoryIds)
        });
    }
}
exports.RecordHistoryNewValueDao = RecordHistoryNewValueDao;
di_1.DI.set(tokens_1.REC_HIST_NEW_VALUE_DAO, RecordHistoryNewValueDao);
//# sourceMappingURL=RecordHistoryNewValueDao.js.map