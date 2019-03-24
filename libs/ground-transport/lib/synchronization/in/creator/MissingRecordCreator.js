"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const moving_walkway_1 = require("@airport/moving-walkway");
const diTokens_1 = require("../../../diTokens");
class MissingRecordCreator {
    constructor() {
        di_1.DI.get((missingRecordDao) => {
            this.missingRecordDao = missingRecordDao;
        }, moving_walkway_1.MISSING_RECORD_DAO);
    }
}
exports.MissingRecordCreator = MissingRecordCreator;
di_1.DI.set(diTokens_1.MISSING_RECORD_CREATOR, MissingRecordCreator);
//# sourceMappingURL=MissingRecordCreator.js.map