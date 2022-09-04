import { IContext } from '@airport/direction-indicator';
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IActorDao } from '@airport/holding-pattern/dist/app/bundle';
export interface ISyncInActorChecker {
    ensureActors(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    actorDao: IActorDao;
    ensureActors(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private checkActorApplication;
    private checkActorTerminal;
    private checkActorUserAccount;
}
//# sourceMappingURL=SyncInActorChecker.d.ts.map