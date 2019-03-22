"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airport_code_1 = require("@airport/airport-code");
const di_1 = require("@airport/di");
class SequenceConsumerDao {
    async create(entityInfo) {
        return 1;
    }
}
exports.SequenceConsumerDao = SequenceConsumerDao;
di_1.DI.set(airport_code_1.SEQUENCE_CONSUMER_DAO, SequenceConsumerDao);
//# sourceMappingURL=SequenceConsumerDao.js.map