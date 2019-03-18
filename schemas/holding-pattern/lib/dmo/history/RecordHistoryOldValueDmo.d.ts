import { DbColumn } from '@airport/ground-control';
import { BaseRecordHistoryOldValueDmo, IRecordHistory, IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryOldValueDmo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryOldValueDmo extends BaseRecordHistoryOldValueDmo implements IRecordHistoryOldValueDmo {
    constructor();
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
