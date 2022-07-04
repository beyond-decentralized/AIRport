import { Repository } from '../repository/Repository';
import { OperationHistory } from './OperationHistory';
import { RepositoryTransactionType } from './RepositoryTransactionType';
import { TransactionHistory } from './TransactionHistory';
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RepositoryTransactionHistory_LocalId = number;
export declare type RepositoryTransactionHistory_IsRepositoryCreation = boolean;
export declare type RepositoryTransactionHistory_BlockId = number;
export declare type RepositoryTransactionHistory_SaveTimestamp = number;
export declare type RepositoryTransactionHistory_SyncTimestamp = number;
export declare type RepositoryTransactionHistory_GUID = string;
export declare class RepositoryTransactionHistory {
    _localId: RepositoryTransactionHistory_LocalId;
    repositoryTransactionType: RepositoryTransactionType;
    saveTimestamp: RepositoryTransactionHistory_SaveTimestamp;
    syncTimestamp: RepositoryTransactionHistory_SyncTimestamp;
    GUID: RepositoryTransactionHistory_GUID;
    isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation;
    repository: Repository;
    transactionHistory: TransactionHistory;
    operationHistory: OperationHistory[];
    constructor(data?: RepositoryTransactionHistory);
}
//# sourceMappingURL=RepositoryTransactionHistory.d.ts.map