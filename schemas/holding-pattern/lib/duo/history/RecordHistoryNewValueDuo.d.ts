import { DbColumn } from '@airport/ground-control';
import { IRecordHistory, IRecordHistoryNewValue } from '../../generated/generated';
export interface IRecordHistoryNewValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
export declare class RecordHistoryNewValueDuo implements IRecordHistoryNewValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
//# sourceMappingURL=RecordHistoryNewValueDuo.d.ts.map