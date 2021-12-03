import { TransactionType } from '@airport/ground-control';
import { IActor, IRepositoryTransactionHistory, ITransactionHistory, Repository_Id } from '@airport/holding-pattern';
import { IHistoryManager, IOperationContext } from '@airport/terminal-map';
export declare class HistoryManager implements IHistoryManager {
    getNewTransHistory(transactionType?: TransactionType): Promise<ITransactionHistory>;
    getNewRepositoryTransactionHistory(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, actor: IActor, context: IOperationContext): Promise<IRepositoryTransactionHistory>;
}
//# sourceMappingURL=HistoryManager.d.ts.map