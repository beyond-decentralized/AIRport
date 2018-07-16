import { IOperationHistory } from "../../generated/history/qoperationhistory";
import { IRepositoryTransactionHistory } from "../../generated/history/qrepositorytransactionhistory";
import { ITransactionHistory } from "../../generated/history/qtransactionhistory";
import { IActor } from "../../generated/infrastructure/qactor";
import { IRepository } from "../../generated/repository/qrepository";
import { RepositoryTransactionType } from "./RepositoryTransactionType";
import { RepoTransHistoryChangedRepositoryActor } from "./RepoTransHistoryChangedRepositoryActor";
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RepositoryTransactionHistoryId = number;
export declare type RepositoryTransactionHistoryRemoteId = number;
export declare type RepositoryTransactionHistorySaveTimestamp = Date;
export declare type RepositoryTransactionHistoryBlockId = number;
export declare class RepositoryTransactionHistory implements IRepositoryTransactionHistory {
    id: RepositoryTransactionHistoryId;
    remoteId: RepositoryTransactionHistoryRemoteId;
    transactionHistory: ITransactionHistory;
    repository: IRepository;
    changedRepositoryActors: RepoTransHistoryChangedRepositoryActor[];
    actor: IActor;
    saveTimestamp: RepositoryTransactionHistorySaveTimestamp;
    repositoryTransactionType: RepositoryTransactionType;
    blockId: RepositoryTransactionHistoryBlockId;
    operationHistory: IOperationHistory[];
    constructor(data?: IRepositoryTransactionHistory);
}
