"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SequenceConsumerDao extends generated_1.BaseSequenceConsumerDao {
}
exports.SequenceConsumerDao = SequenceConsumerDao;
di_1.DI.set(diTokens_1.SEQUENCE_CONSUMER_DAO, SequenceConsumerDao);
//# sourceMappingURL=SequenceConsumerDao.js.map