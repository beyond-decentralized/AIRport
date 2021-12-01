import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInActorChecker {
    ensureActors(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    ensureActors(message: RepositorySynchronizationMessage): Promise<boolean>;
}
//# sourceMappingURL=SyncInActorChecker.d.ts.map