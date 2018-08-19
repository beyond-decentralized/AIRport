import { ChangeType } from '@airport/ground-control';
import { ISchemaEntity, ISchemaVersion } from '@airport/traffic-pattern';
import { IOperationHistory } from '../../generated/history/qoperationhistory';
import { IRecordHistory } from '../../generated/history/qrecordhistory';
import { IRepositoryTransactionHistory } from '../../generated/history/qrepositorytransactionhistory';
/**
 * Created by Papa on 4/17/2017.
 */
export declare type OperationHistoryId = number;
export declare type OperationHistoryOrderNumber = number;
/**
 * Marks a group of mutation history changes.
 */
export declare class OperationHistory implements IOperationHistory {
    id: OperationHistoryId;
    repositoryTransactionHistory: IRepositoryTransactionHistory;
    orderNumber: OperationHistoryOrderNumber;
    changeType: ChangeType;
    schemaVersion: ISchemaVersion;
    entity: ISchemaEntity;
    recordHistory: IRecordHistory[];
}
