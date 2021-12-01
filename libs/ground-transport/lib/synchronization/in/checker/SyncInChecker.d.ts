import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInChecker {
    checkMessage(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInChecker implements ISyncInChecker {
    /**
     * Check the message and load all required auxiliary entities.
     */
    checkMessage(message: RepositorySynchronizationMessage): Promise<boolean>;
}
//# sourceMappingURL=SyncInChecker.d.ts.map