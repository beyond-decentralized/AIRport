import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, RecordHistoryGraph, RecordHistoryEOptionalId, RecordHistoryESelect, QRecordHistoryQRelation } from '@airport/holding-pattern';
import { SynchronizationConflictValuesGraph, SynchronizationConflictValuesESelect, QSynchronizationConflictValues } from './qsynchronizationconflictvalues';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictESelect extends IEntitySelectProperties, SynchronizationConflictEOptionalId {
    type?: string | IQStringField;
    acknowledged?: boolean | IQBooleanField;
    repository?: RepositoryESelect;
    overwrittenRecordHistory?: RecordHistoryESelect;
    overwritingRecordHistory?: RecordHistoryESelect;
    values?: SynchronizationConflictValuesESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictEUpdateProperties extends IEntityUpdateProperties {
    type?: string | IQStringField;
    acknowledged?: boolean | IQBooleanField;
    repository?: RepositoryEOptionalId;
    overwrittenRecordHistory?: RecordHistoryEOptionalId;
    overwritingRecordHistory?: RecordHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictGraph extends SynchronizationConflictEOptionalId, IEntityCascadeGraph {
    type?: string | IQStringField;
    acknowledged?: boolean | IQBooleanField;
    repository?: RepositoryGraph;
    overwrittenRecordHistory?: RecordHistoryGraph;
    overwritingRecordHistory?: RecordHistoryGraph;
    values?: SynchronizationConflictValuesGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictEUpdateColumns extends IEntityUpdateColumns {
    TYPE?: string | IQStringField;
    ACKNOWLEDGED?: boolean | IQBooleanField;
    REPOSITORY_LID?: number | IQNumberField;
    OVERWRITTEN_RECORD_HISTORY_LID?: number | IQNumberField;
    OVERWRITING_RECORD_HISTORY_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictECreateProperties extends Partial<SynchronizationConflictEId>, SynchronizationConflictEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictECreateColumns extends SynchronizationConflictEId, SynchronizationConflictEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSynchronizationConflict extends IQEntity {
    _localId: IQNumberField;
    type: IQStringField;
    acknowledged: IQBooleanField;
    repository: QRepositoryQRelation;
    overwrittenRecordHistory: QRecordHistoryQRelation;
    overwritingRecordHistory: QRecordHistoryQRelation;
    values: IQOneToManyRelation<QSynchronizationConflictValues>;
}
export interface QSynchronizationConflictQId {
    _localId: IQNumberField;
}
export interface QSynchronizationConflictQRelation extends IQRelation<QSynchronizationConflict>, QSynchronizationConflictQId {
}
//# sourceMappingURL=qsynchronizationconflict.d.ts.map