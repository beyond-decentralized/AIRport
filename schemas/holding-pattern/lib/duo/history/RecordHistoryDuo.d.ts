import { DbColumn } from '@airport/ground-control';
import { Actor_LocalId, AirEntity_ActorRecordId } from '../../ddl/ddl';
import { IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../generated/generated';
import { IRecordHistoryNewValueDuo } from './RecordHistoryNewValueDuo';
import { IRecordHistoryOldValueDuo } from './RecordHistoryOldValueDuo';
export interface IRecordHistoryDuo {
    getNewRecord(actorId: Actor_LocalId, _actorRecordId: AirEntity_ActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
export declare class RecordHistoryDuo implements IRecordHistoryDuo {
    recordHistoryNewValueDuo: IRecordHistoryNewValueDuo;
    recordHistoryOldValueDuo: IRecordHistoryOldValueDuo;
    getNewRecord(actorId: Actor_LocalId, _actorRecordId: AirEntity_ActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any): IRecordHistoryOldValue;
}
//# sourceMappingURL=RecordHistoryDuo.d.ts.map