"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../../tokens");
// const log = GROUND_TRANSPORT_LOGGER.add("SyncInConsistencyChecker");
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
di_1.DI.set(tokens_1.SYNC_IN_CONSISTENCY_CHECKER, SyncInConsistencyChecker);
//# sourceMappingURL=SyncInConsistencyChecker.js.map