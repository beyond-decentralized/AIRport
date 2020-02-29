import { DI } from '@airport/di';
import { SYNC_IN_CONSISTENCY_CHECKER } from '../../../tokens';
// const log = GROUND_TRANSPORT_LOGGER.add("SyncInConsistencyChecker");
export class SyncInConsistencyChecker {
    ensureConsistency(message) {
    }
    isRepositoryConsistent() {
    }
    areActorsConsistent(message) {
    }
    areSchemasConsistent() {
    }
}
DI.set(SYNC_IN_CONSISTENCY_CHECKER, SyncInConsistencyChecker);
//# sourceMappingURL=SyncInConsistencyChecker.js.map