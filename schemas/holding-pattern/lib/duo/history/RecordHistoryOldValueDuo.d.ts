import { DbColumn } from '@airport/ground-control';
import { BaseRecordHistoryOldValueDuo, IRecordHistory, IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryOldValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryOldValueDuo extends BaseRecordHistoryOldValueDuo implements IRecordHistoryOldValueDuo {
    constructor();
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
