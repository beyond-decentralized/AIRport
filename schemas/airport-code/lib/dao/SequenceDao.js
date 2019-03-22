"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SequenceDao extends generated_1.BaseSequenceDao {
}
exports.SequenceDao = SequenceDao;
di_1.DI.set(diTokens_1.SEQUENCE_DAO, SequenceDao);
//# sourceMappingURL=SequenceDao.js.map