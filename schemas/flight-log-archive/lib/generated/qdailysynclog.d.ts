import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { DailySyncLog } from '../ddl/DailySyncLog';
/**
 * SELECT - All fields and relations (optional).
 */
export interface DailySyncLogESelect extends IEntitySelectProperties, DailySyncLogEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailySyncLogEId extends IEntityIdProperties {
    databaseId: number | IQNumberField;
    date: number | IQNumberField;
    repositoryId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DailySyncLogEOptionalId {
    databaseId?: number | IQNumberField;
    date?: number | IQNumberField;
    repositoryId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailySyncLogEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailySyncLogGraph extends DailySyncLogEOptionalId, IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DailySyncLogEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailySyncLogECreateProperties extends Partial<DailySyncLogEId>, DailySyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailySyncLogECreateColumns extends DailySyncLogEId, DailySyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailySyncLog extends IQEntity<DailySyncLog> {
    databaseId: IQNumberField;
    date: IQNumberField;
    repositoryId: IQNumberField;
}
export interface QDailySyncLogQId {
    databaseId: IQNumberField;
    date: IQNumberField;
    repositoryId: IQNumberField;
}
export interface QDailySyncLogQRelation extends IQRelation<DailySyncLog, QDailySyncLog>, QDailySyncLogQId {
}
//# sourceMappingURL=qdailysynclog.d.ts.map