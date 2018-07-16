import { IRecordHistoryNewValue, RecordHistoryId } from "../..";
import { BaseRecordHistoryNewValueDao, IBaseRecordHistoryNewValueDao } from "../../generated/generated";
export interface IRecordHistoryNewValueDao extends IBaseRecordHistoryNewValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryNewValue[]>;
}
export declare class RecordHistoryNewValueDao extends BaseRecordHistoryNewValueDao implements IRecordHistoryNewValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryNewValue[]>;
}
