import { DbColumn } from "@airport/air-control";
import { BaseRecordHistoryNewValueDmo, IRecordHistory, IRecordHistoryNewValue } from "../../generated/generated";
export interface IRecordHistoryNewValueDmo {
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
export declare class RecordHistoryNewValueDmo extends BaseRecordHistoryNewValueDmo implements IRecordHistoryNewValueDmo {
    constructor();
    getNewRecord(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
}
