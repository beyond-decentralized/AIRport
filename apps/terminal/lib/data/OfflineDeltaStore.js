"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
function getOfflineDeltaStore(localStore) {
    switch (localStore.type) {
        case terminal_map_1.StoreType.SQLITE_CORDOVA:
        case terminal_map_1.StoreType.SQLJS:
            throw `Implement!`;
        // return new OfflineSqlDeltaStore(localStore);
        default:
            throw `Unsupported LocalStoreType: ${localStore.type}`;
    }
}
exports.getOfflineDeltaStore = getOfflineDeltaStore;
class OfflineDeltaStore {
    addRemoteChanges(repository, transactions) {
        throw `Implement!`;
    }
    addChange(transaction) {
        throw `Implement!`;
    }
    markChangesAsSynced(repository, transactions) {
        throw `Implement!`;
    }
}
exports.OfflineDeltaStore = OfflineDeltaStore;
di_1.DI.set(diTokens_1.OFFLINE_DELTA_STORE, OfflineDeltaStore);
//# sourceMappingURL=OfflineDeltaStore.js.map