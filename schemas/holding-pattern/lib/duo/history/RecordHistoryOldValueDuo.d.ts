import { DbColumn } from '@airport/ground-control';
import { IRecordHistory, IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryOldValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryOldValueDuo implements IRecordHistoryOldValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
//# sourceMappingURL=RecordHistoryOldValueDuo.d.ts.map