import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQDateField, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlySyncLogESelect extends IEntitySelectProperties, MonthlySyncLogEOptionalId {
    synced?: boolean | IQBooleanField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlySyncLogEId extends IEntityIdProperties {
    databaseId: number | IQNumberField;
    month: Date | IQDateField;
    repositoryId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MonthlySyncLogEOptionalId {
    databaseId?: number | IQNumberField;
    month?: Date | IQDateField;
    repositoryId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlySyncLogEUpdateProperties extends IEntityUpdateProperties {
    synced?: boolean | IQBooleanField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlySyncLogGraph extends IEntitySelectProperties, MonthlySyncLogEOptionalId, IEntityCascadeGraph {
    synced?: boolean | IQBooleanField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlySyncLogEUpdateColumns extends IEntityUpdateColumns {
    SYNCED?: boolean | IQBooleanField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlySyncLogECreateProperties extends Partial<MonthlySyncLogEId>, MonthlySyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlySyncLogECreateColumns extends MonthlySyncLogEId, MonthlySyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlySyncLog extends IQEntity {
    databaseId: IQNumberField;
    month: IQDateField;
    repositoryId: IQNumberField;
    synced: IQBooleanField;
}
export interface QMonthlySyncLogQId {
    databaseId: IQNumberField;
    month: IQDateField;
    repositoryId: IQNumberField;
}
export interface QMonthlySyncLogQRelation extends IQRelation<QMonthlySyncLog>, QMonthlySyncLogQId {
}
//# sourceMappingURL=qmonthlysynclog.d.ts.map