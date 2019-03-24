"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const Constants_1 = require("../../../Constants");
const diTokens_1 = require("../../../diTokens");
const log = Constants_1.GROUND_TRANSPORT_LOGGER.add("SyncInConsistencyChecker");
class SyncInConsistencyChecker {
    ensureConsistency(message) {
    }
    isRepositoryConsistent() {
    }
    areActorsConsistent(message) {
    }
    areSchemasConsistent() {
    }
}
exports.SyncInConsistencyChecker = SyncInConsistencyChecker;
di_1.DI.set(diTokens_1.SYNC_IN_CONSISTENCY_CHECKER, SyncInConsistencyChecker);
//# sourceMappingURL=SyncInConsistencyChecker.js.map