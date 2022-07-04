import { TransactionType } from '@airport/ground-control';
import { IRepositoryTransactionHistory, ITransactionHistory, ITransactionHistoryDuo, Repository_LocalId } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IHistoryManager, IOperationContext } from '@airport/terminal-map';
export declare class HistoryManager implements IHistoryManager {
    transactionHistoryDuo: ITransactionHistoryDuo;
    getNewTransactionHistory(transactionType?: TransactionType): Promise<ITransactionHistory>;
    getNewRepositoryTransactionHistory(transactionHistory: ITransactionHistory, repositoryId: Repository_LocalId, context: IOperationContext): Promise<IRepositoryTransactionHistory>;
}
//# sourceMappingURL=HistoryManager.d.ts.map