import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { SynchronizationConflictGraph, SynchronizationConflictEId, SynchronizationConflictEOptionalId, SynchronizationConflictESelect, QSynchronizationConflictQId, QSynchronizationConflictQRelation } from './qsynchronizationconflict';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictValuesESelect extends IEntitySelectProperties, SynchronizationConflictValuesEOptionalId {
    synchronizationConflict?: SynchronizationConflictESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictValuesEId extends IEntityIdProperties {
    columnIndex: number | IQNumberField;
    synchronizationConflict: SynchronizationConflictEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictValuesEOptionalId {
    columnIndex?: number | IQNumberField;
    synchronizationConflict?: SynchronizationConflictEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictValuesEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictValuesGraph extends SynchronizationConflictValuesEOptionalId, IEntityCascadeGraph {
    synchronizationConflict?: SynchronizationConflictGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictValuesEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictValuesECreateProperties extends Partial<SynchronizationConflictValuesEId>, SynchronizationConflictValuesEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictValuesECreateColumns extends SynchronizationConflictValuesEId, SynchronizationConflictValuesEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSynchronizationConflictValues extends IQEntity {
    columnIndex: IQNumberField;
    synchronizationConflict: QSynchronizationConflictQRelation;
}
export interface QSynchronizationConflictValuesQId {
    columnIndex: IQNumberField;
    synchronizationConflict: QSynchronizationConflictQId;
}
export interface QSynchronizationConflictValuesQRelation extends IQRelation<QSynchronizationConflictValues>, QSynchronizationConflictValuesQId {
}
//# sourceMappingURL=qsynchronizationconflictvalues.d.ts.map