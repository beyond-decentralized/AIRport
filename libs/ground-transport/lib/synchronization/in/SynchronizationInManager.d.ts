import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistoryDao } from '@airport/holding-pattern';
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map';
import { ISyncInChecker } from './checker/SyncInChecker';
import { ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor';
/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
}
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao;
    syncInChecker: ISyncInChecker;
    transactionManager: ITransactionManager;
    twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor;
    receiveMessages(messageMapByUuId: Map<string, RepositorySynchronizationMessage>, context: ITransactionContext): Promise<void>;
    private timeOrderMessages;
    private isValidLastChangeTime;
}
//# sourceMappingURL=SynchronizationInManager.d.ts.map