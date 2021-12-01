import { IRepositoryTransactionHistory } from '@airport/holding-pattern';
export interface ISynchronizationOutManager {
    synchronizeOut(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<void>;
}
export declare class SynchronizationOutManager implements ISynchronizationOutManager {
    synchronizeOut(repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<void>;
    private groupMessagesBySourceAndRepository;
    private updateRepositoryTransactionHistories;
}
//# sourceMappingURL=SynchronizationOutManager.d.ts.map