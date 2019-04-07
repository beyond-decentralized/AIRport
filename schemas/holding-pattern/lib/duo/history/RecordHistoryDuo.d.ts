import { DbColumn } from '@airport/ground-control';
import { RepositoryEntityActorRecordId } from '../../ddl/ddl';
import { BaseRecordHistoryDuo, IBaseRecordHistoryDuo, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryDuo extends IBaseRecordHistoryDuo {
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryDuo extends BaseRecordHistoryDuo implements IRecordHistoryDuo {
    private recHistoryNewValueDuo;
    private recHistoryOldValueDuo;
    constructor();
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
