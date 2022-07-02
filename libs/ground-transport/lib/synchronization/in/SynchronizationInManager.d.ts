import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistoryDao } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map';
import { ISyncInChecker } from './checker/SyncInChecker';
import { ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByGUID: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao;
    syncInChecker: ISyncInChecker;
    transactionManager: ITransactionManager;
    twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor;
    receiveMessages(messageMapByGUID: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
    private timeOrderMessages;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map