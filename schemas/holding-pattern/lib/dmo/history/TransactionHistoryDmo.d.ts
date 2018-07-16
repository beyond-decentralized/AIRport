import { TransactionType } from "@airport/ground-control";
import { BaseTransactionHistoryDmo, IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from "../../generated/generated";
import { IRepositoryTransactionHistoryDmo } from "./RepositoryTransactionHistoryDmo";
export interface ITransactionHistoryDmo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDmo extends BaseTransactionHistoryDmo implements ITransactionHistoryDmo {
    private repositoryTransactionHistoryDmo;
    constructor(repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo);
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
