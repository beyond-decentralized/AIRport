import { DbColumn } from '@airport/ground-control';
import { Actor_Id, RepositoryEntity_ActorRecordId } from '../../ddl/ddl';
import { BaseRecordHistoryDuo, IBaseRecordHistoryDuo, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../generated/generated';
import { IRecordHistoryNewValueDuo } from './RecordHistoryNewValueDuo';
import { IRecordHistoryOldValueDuo } from './RecordHistoryOldValueDuo';
export interface IRecordHistoryDuo extends IBaseRecordHistoryDuo {
    getNewRecord(actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any, recHistoryNewValueDuo: IRecordHistoryNewValueDuo): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any, recHistoryOldValueDuo: IRecordHistoryOldValueDuo): IRecordHistoryOldValue;
}
export declare class RecordHistoryDuo extends BaseRecordHistoryDuo implements IRecordHistoryDuo {
    getNewRecord(actorId: Actor_Id, actorRecordId: RepositoryEntity_ActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any, recHistoryNewValueDuo: IRecordHistoryNewValueDuo): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any, recordHistoryOldValueDuo: IRecordHistoryOldValueDuo): IRecordHistoryOldValue;
}
//# sourceMappingURL=RecordHistoryDuo.d.ts.map