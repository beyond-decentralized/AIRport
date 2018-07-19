import { DbColumn } from "@airport/ground-control";
import { IBaseRecordHistoryDmo } from "../../";
import { RepositoryEntityActorRecordId } from "../../ddl/ddl";
import { BaseRecordHistoryDmo, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from "../../generated/generated";
import { IRecordHistoryNewValueDmo } from "./RecordHistoryNewValueDmo";
import { IRecordHistoryOldValueDmo } from "./RecordHistoryOldValueDmo";
export interface IRecordHistoryDmo extends IBaseRecordHistoryDmo {
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare abstract class RecordHistoryDmo extends BaseRecordHistoryDmo implements IRecordHistoryDmo {
    private recordHistoryNewValueDmo;
    private recordHistoryOldValueDmo;
    constructor(recordHistoryNewValueDmo: IRecordHistoryNewValueDmo, recordHistoryOldValueDmo: IRecordHistoryOldValueDmo);
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
