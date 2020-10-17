import { DI } from '@airport/di';
import { StoreType } from '@airport/terminal-map';
import { OFFLINE_DELTA_STORE } from '../tokens';
export function getOfflineDeltaStore(localStore) {
    switch (localStore.type) {
        case StoreType.SQLITE_CORDOVA:
        case StoreType.SQLJS:
            throw new Error(`Implement!`);
        // return new OfflineSqlDeltaStore(localStore);
        default:
            throw new Error(`Unsupported LocalStoreType: ${localStore.type}`);
    }
}
export class OfflineDeltaStore {
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
DI.set(OFFLINE_DELTA_STORE, OfflineDeltaStore);
//# sourceMappingURL=OfflineDeltaStore.js.map