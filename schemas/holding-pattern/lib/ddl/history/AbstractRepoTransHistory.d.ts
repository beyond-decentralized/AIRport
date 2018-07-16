import { IOperationHistory } from "../../generated/history/qoperationhistory";
import { IRepositoryTransactionHistory } from "../../generated/history/qrepositorytransactionhistory";
import { ITransactionHistory } from "../../generated/history/qtransactionhistory";
import { IActor } from "../../generated/infrastructure/qactor";
import { IRepository } from "../../generated/repository/qrepository";
import { RepositoryTransactionType } from "./RepositoryTransactionType";
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RepositoryTransactionHistoryId = number;
export declare type RepositoryTransactionHistoryRemoteId = number;
export declare type RepositoryTransactionHistorySaveTimestamp = Date;
export declare class AbstractRepoTransHistory implements IRepositoryTransactionHistory {
    id: RepositoryTransactionHistoryId;
    remoteId: RepositoryTransactionHistoryRemoteId;
    transactionHistory: ITransactionHistory;
    repository: IRepository;
    actor: IActor;
    saveTimestamp: RepositoryTransactionHistorySaveTimestamp;
    repositoryTransactionType: RepositoryTransactionType;
    operationHistory: IOperationHistory[];
    constructor(data?: IRepositoryTransactionHistory);
}
