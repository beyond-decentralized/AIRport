"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
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
//# sourceMappingURL=OfflineDeltaStore.js.map