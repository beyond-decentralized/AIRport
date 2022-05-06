import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IActorDao } from '@airport/holding-pattern-runtime';
export interface ISyncInActorChecker {
    ensureActors(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    actorDao: IActorDao;
    ensureActors(message: RepositorySynchronizationMessage): Promise<boolean>;
    private checkActorApplication;
    private checkActorTerminal;
    private checkActorUser;
}
//# sourceMappingURL=SyncInActorChecker.d.ts.map