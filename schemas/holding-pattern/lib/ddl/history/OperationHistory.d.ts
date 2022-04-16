import { ChangeType } from '@airport/ground-control';
import { IApplicationEntity } from '@airport/airspace';
import { SystemWideOperationId } from '../common';
import { RecordHistory } from './RecordHistory';
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory';
import { Actor } from '../ddl';
/**
 * Created by Papa on 4/17/2017.
 */
export declare type OperationHistory_Id = number;
export declare type OperationHistory_OrderNumber = number;
export declare type OperationHistory_SystemWideOperationId = SystemWideOperationId;
/**
 * Marks a group of mutation history changes.
 */
export declare class OperationHistory {
    id: OperationHistory_Id;
    orderNumber: OperationHistory_OrderNumber;
    changeType: ChangeType;
    systemWideOperationId: OperationHistory_SystemWideOperationId;
    entity: IApplicationEntity;
    actor: Actor;
    repositoryTransactionHistory: RepositoryTransactionHistory;
    recordHistory: RecordHistory[];
}
//# sourceMappingURL=OperationHistory.d.ts.map