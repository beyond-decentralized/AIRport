import { ChangeType } from '@airport/ground-control';
import { ISchemaEntity } from '@airport/traffic-pattern';
import { SystemWideOperationId } from '../common';
import { IOperationHistory } from '../../generated/history/qoperationhistory';
import { IRecordHistory } from '../../generated/history/qrecordhistory';
import { IRepositoryTransactionHistory } from '../../generated/history/qrepositorytransactionhistory';
/**
 * Created by Papa on 4/17/2017.
 */
export declare type OperationHistoryId = number;
export declare type OperationHistoryOrderNumber = number;
export declare type OperationHistorySystemWideOperationId = SystemWideOperationId;
/**
 * Marks a group of mutation history changes.
 */
export declare class OperationHistory implements IOperationHistory {
    id: OperationHistoryId;
    repositoryTransactionHistory: IRepositoryTransactionHistory;
    orderNumber: OperationHistoryOrderNumber;
    changeType: ChangeType;
    systemWideOperationId: OperationHistorySystemWideOperationId;
    entity: ISchemaEntity;
    recordHistory: IRecordHistory[];
}
