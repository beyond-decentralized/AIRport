import { DbColumn } from '@airport/ground-control';
import { RepositoryEntityActorRecordId } from '../../ddl/ddl';
import { BaseRecordHistoryDmo, IBaseRecordHistoryDmo, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryDmo extends IBaseRecordHistoryDmo {
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryDmo extends BaseRecordHistoryDmo implements IRecordHistoryDmo {
    private recHistoryNewValueDmo;
    private recHistoryOldValueDmo;
    constructor();
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
