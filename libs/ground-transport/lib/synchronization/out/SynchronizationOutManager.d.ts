import { IRepositoryDao, IRepositoryTransactionHistory, IRepositoryTransactionHistoryDao } from '@airport/holding-pattern';
import { ISynchronizationAdapterLoader } from '../../adapters/SynchronizationAdapterLoader';
import { ISyncOutDataSerializer } from './converter/SyncOutDataSerializer';
export interface ISynchronizationOutManager {
    synchronizeOut(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<void>;
}
export declare class SynchronizationOutManager implements ISynchronizationOutManager {
    repositoryDao: IRepositoryDao;
    repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao;
    synchronizationAdapterLoader: ISynchronizationAdapterLoader;
    syncOutDataSerializer: ISyncOutDataSerializer;
    synchronizeOut(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<void>;
    private loadHistoryRepositories;
    private ensureGlobalRepositoryIdentifiers;
    private groupMessagesBySourceAndRepository;
    private updateRepositoryTransactionHistories;
}
//# sourceMappingURL=SynchronizationOutManager.d.ts.map