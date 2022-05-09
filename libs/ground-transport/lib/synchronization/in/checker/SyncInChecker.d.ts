import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInApplicationChecker } from './SyncInApplicationChecker';
import { ISyncInDataChecker } from './SyncInDataChecker';
import { ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
import { ISyncInTerminalChecker } from './SyncInTerminalChecker';
import { ISyncInUserChecker } from './SyncInUserChecker';
import { IContext } from '@airport/direction-indicator';
export interface ISyncInChecker {
    checkMessage(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInChecker implements ISyncInChecker {
    syncInActorChecker: ISyncInActorChecker;
    syncInApplicationChecker: ISyncInApplicationChecker;
    syncInApplicationVersionChecker: ISyncInApplicationVersionChecker;
    syncInDataChecker: ISyncInDataChecker;
    syncInRepositoryChecker: ISyncInRepositoryChecker;
    syncInTerminalChecker: ISyncInTerminalChecker;
    syncInUserChecker: ISyncInUserChecker;
    /**
     * Check the message and load all required auxiliary entities.
     */
    checkMessage(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
//# sourceMappingURL=SyncInChecker.d.ts.map