import { IRecordHistory } from './recordhistory';
export interface IRecordHistoryNewValue {
    columnIndex: number;
    recordHistory: IRecordHistory;
    newValue?: any;
}
