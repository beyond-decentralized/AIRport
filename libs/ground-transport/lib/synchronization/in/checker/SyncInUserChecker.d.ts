import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInUserChecker {
    ensureUsers(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    ensureUsers(message: RepositorySynchronizationMessage): Promise<boolean>;
    private addMissingUsers;
}
//# sourceMappingURL=SyncInUserChecker.d.ts.map