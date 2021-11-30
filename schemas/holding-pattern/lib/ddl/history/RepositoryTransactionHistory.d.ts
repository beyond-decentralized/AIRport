import { Actor } from '../infrastructure/Actor';
import { Repository } from '../repository/Repository';
import { OperationHistory } from './OperationHistory';
import { RepositoryTransactionType } from './RepositoryTransactionType';
import { TransactionHistory } from './TransactionHistory';
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RepositoryTransactionHistory_Id = number;
export declare type RepositoryTransactionHistory_SaveTimestamp = number;
export declare type RepositoryTransactionHistory_BlockId = number;
export declare type RepositoryTransactionHistory_Synced = boolean;
export declare class RepositoryTransactionHistory {
    id: RepositoryTransactionHistory_Id;
    saveTimestamp: RepositoryTransactionHistory_SaveTimestamp;
    repositoryTransactionType: RepositoryTransactionType;
    synced: RepositoryTransactionHistory_Synced;
    transactionHistory: TransactionHistory;
    repository: Repository;
    actor: Actor;
    operationHistory: OperationHistory[];
    constructor(data?: RepositoryTransactionHistory);
}
//# sourceMappingURL=RepositoryTransactionHistory.d.ts.map