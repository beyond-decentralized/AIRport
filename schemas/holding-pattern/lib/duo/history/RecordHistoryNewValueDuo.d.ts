import { DbColumn } from '@airport/ground-control';
import { BaseRecordHistoryNewValueDuo, IRecordHistory, IRecordHistoryNewValue } from '../../generated/generated';
export interface IRecordHistoryNewValueDuo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
export declare class RecordHistoryNewValueDuo extends BaseRecordHistoryNewValueDuo implements IRecordHistoryNewValueDuo {
    constructor();
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
//# sourceMappingURL=RecordHistoryNewValueDuo.d.ts.map