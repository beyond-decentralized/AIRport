import { IContext } from '@airport/direction-indicator';
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IUserAccountDao } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface ISyncInUserAccountChecker {
    ensureUserAccounts(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInUserAccountChecker implements ISyncInUserAccountChecker {
    userAccountDao: IUserAccountDao;
    ensureUserAccounts(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private addMissingUserAccounts;
}
//# sourceMappingURL=SyncInUserAccountChecker.d.ts.map