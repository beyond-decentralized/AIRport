import { IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory, OperationHistoryDmo, RecordHistoryDmo, RepositoryTransactionHistoryDmo, TransactionHistoryDmo } from "@airport/holding-pattern";
import { TransactionType } from "@airport/terminal-map/lib/TransactionType";
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): ITransactionHistory;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
export declare class HistoryManager implements IHistoryManager {
    private operationHistoryDmo;
    private recordHistoryDmo;
    private repositoryTransactionHistoryDmo;
    private transactionHistoryDmo;
    constructor(operationHistoryDmo: OperationHistoryDmo, recordHistoryDmo: RecordHistoryDmo, repositoryTransactionHistoryDmo: RepositoryTransactionHistoryDmo, transactionHistoryDmo: TransactionHistoryDmo);
    getNewTransHistory(transactionType?: TransactionType): ITransactionHistory;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
