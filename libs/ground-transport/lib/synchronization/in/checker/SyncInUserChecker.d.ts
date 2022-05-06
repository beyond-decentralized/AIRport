import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IUserDao } from '@airport/travel-document-checkpoint-runtime';
export interface ISyncInUserChecker {
    ensureUsers(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    userDao: IUserDao;
    ensureUsers(message: RepositorySynchronizationMessage): Promise<boolean>;
    private addMissingUsers;
}
//# sourceMappingURL=SyncInUserChecker.d.ts.map