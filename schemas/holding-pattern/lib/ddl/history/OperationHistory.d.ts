import { ChangeType } from '@airport/ground-control';
import { ISchemaEntity } from '@airport/airspace';
import { SystemWideOperationId } from '../common';
import { RecordHistory } from './RecordHistory';
import { RepositoryTransactionHistory } from './RepositoryTransactionHistory';
/**
 * Created by Papa on 4/17/2017.
 */
export declare type OperationHistoryId = number;
export declare type OperationHistoryOrderNumber = number;
export declare type OperationHistorySystemWideOperationId = SystemWideOperationId;
/**
 * Marks a group of mutation history changes.
 */
export declare class OperationHistory {
    id: OperationHistoryId;
    repositoryTransactionHistory: RepositoryTransactionHistory;
    orderNumber: OperationHistoryOrderNumber;
    changeType: ChangeType;
    systemWideOperationId: OperationHistorySystemWideOperationId;
    entity: ISchemaEntity;
    recordHistory: RecordHistory[];
}
//# sourceMappingURL=OperationHistory.d.ts.map