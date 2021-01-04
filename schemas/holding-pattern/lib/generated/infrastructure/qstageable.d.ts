import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQEntity, IQRelation } from '@airport/air-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface StageableESelect extends IEntitySelectProperties, StageableEOptionalId {
    draft?: boolean | IQBooleanField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface StageableEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface StageableEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface StageableEUpdateProperties extends IEntityUpdateProperties {
    draft?: boolean | IQBooleanField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface StageableGraph extends StageableEOptionalId, IEntityCascadeGraph {
    draft?: boolean | IQBooleanField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface StageableEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface StageableECreateProperties extends Partial<StageableEId>, StageableEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface StageableECreateColumns extends StageableEId, StageableEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QStageable<T> extends IQEntity<T> {
    draft: IQBooleanField;
}
export interface QStageableQId {
}
export interface QStageableQRelation<SubType, SubQType extends IQEntity<SubType>> extends IQRelation<SubType, SubQType>, QStageableQId {
}
//# sourceMappingURL=qstageable.d.ts.map