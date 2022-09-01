import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ClassificationESelect extends IEntitySelectProperties, ClassificationEOptionalId {
    name?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClassificationEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClassificationEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClassificationEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClassificationGraph extends ClassificationEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClassificationEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClassificationECreateProperties extends Partial<ClassificationEId>, ClassificationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClassificationECreateColumns extends ClassificationEId, ClassificationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QClassification<IQE extends QClassification = any> extends IQEntity<IQE | QClassification> {
    id: IQNumberField;
    name: IQStringField;
}
export interface QClassificationQId {
    id: IQNumberField;
}
export interface QClassificationQRelation extends IQRelation<QClassification>, QClassificationQId {
}
//# sourceMappingURL=qclassification.d.ts.map