import { Actor } from '../infrastructure/Actor';
import { Repository } from '../repository/Repository';
import { OperationHistory } from './OperationHistory';
import { RepositoryTransactionType } from './RepositoryTransactionType';
import { RepoTransHistoryChangedRepositoryActor } from './RepoTransHistoryChangedRepositoryActor';
import { TransactionHistory } from './TransactionHistory';
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RepositoryTransactionHistoryId = number;
export declare type RepositoryTransactionHistoryRemoteId = number;
export declare type RepositoryTransactionHistorySaveTimestamp = Date;
export declare type RepositoryTransactionHistoryBlockId = number;
export declare class RepositoryTransactionHistory {
    id: RepositoryTransactionHistoryId;
    remoteId: RepositoryTransactionHistoryRemoteId;
    transactionHistory: TransactionHistory;
    repository: Repository;
    changedRepositoryActors: RepoTransHistoryChangedRepositoryActor[];
    actor: Actor;
    saveTimestamp: RepositoryTransactionHistorySaveTimestamp;
    repositoryTransactionType: RepositoryTransactionType;
    blockId: RepositoryTransactionHistoryBlockId;
    operationHistory: OperationHistory[];
    constructor(data?: RepositoryTransactionHistory);
}
