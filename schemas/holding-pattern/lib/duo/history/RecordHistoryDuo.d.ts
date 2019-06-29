import { DbColumn } from '@airport/ground-control';
import { RepositoryEntityActorRecordId } from '../../ddl/ddl';
import { BaseRecordHistoryDuo, IBaseRecordHistoryDuo, IRecordHistory, IRecordHistoryNewValue, IRecordHistoryOldValue } from '../../generated/generated';
import { IRecordHistoryNewValueDuo } from './RecordHistoryNewValueDuo';
import { IRecordHistoryOldValueDuo } from './RecordHistoryOldValueDuo';
export interface IRecordHistoryDuo extends IBaseRecordHistoryDuo {
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any, recHistoryNewValueDuo: IRecordHistoryNewValueDuo): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any, recHistoryOldValueDuo: IRecordHistoryOldValueDuo): IRecordHistoryOldValue;
}
export declare class RecordHistoryDuo extends BaseRecordHistoryDuo implements IRecordHistoryDuo {
    getNewRecord(actorRecordId: RepositoryEntityActorRecordId): IRecordHistory;
    addNewValue(recordHistory: IRecordHistory, dbColumn: DbColumn, newValue: any, recHistoryNewValueDuo: IRecordHistoryNewValueDuo): IRecordHistoryNewValue;
    addOldValue(recordHistory: IRecordHistory, dbColumn: DbColumn, oldValue: any, recHistoryOldValueDuo: IRecordHistoryOldValueDuo): IRecordHistoryOldValue;
}
