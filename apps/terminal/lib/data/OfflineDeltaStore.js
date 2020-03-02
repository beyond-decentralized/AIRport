"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const tokens_1 = require("../tokens");
function getOfflineDeltaStore(localStore) {
    switch (localStore.type) {
        case terminal_map_1.StoreType.SQLITE_CORDOVA:
        case terminal_map_1.StoreType.SQLJS:
            throw new Error(`Implement!`);
        // return new OfflineSqlDeltaStore(localStore);
        default:
            throw new Error(`Unsupported LocalStoreType: ${localStore.type}`);
    }
}
exports.getOfflineDeltaStore = getOfflineDeltaStore;
class OfflineDeltaStore {
    addRemoteChanges(repository, transactions) {
        throw new Error(`Implement!`);
    }
    addChange(transaction) {
        throw new Error(`Implement!`);
    }
    markChangesAsSynced(repository, transactions) {
        throw new Error(`Implement!`);
    }
}
exports.OfflineDeltaStore = OfflineDeltaStore;
di_1.DI.set(tokens_1.OFFLINE_DELTA_STORE, OfflineDeltaStore);
//# sourceMappingURL=OfflineDeltaStore.js.map