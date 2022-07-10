import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { ClassificationGraph, ClassificationEId, ClassificationEOptionalId, ClassificationESelect, QClassificationQId, QClassificationQRelation } from './qclassification';
import { TypeGraph, TypeEId, TypeEOptionalId, TypeESelect, QTypeQId, QTypeQRelation } from './qtype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TypeClassificationESelect extends IEntitySelectProperties, TypeClassificationEOptionalId {
    classification?: ClassificationESelect;
    type?: TypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TypeClassificationEId extends IEntityIdProperties {
    classification: ClassificationEId;
    type: TypeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TypeClassificationEOptionalId {
    classification?: ClassificationEOptionalId;
    type?: TypeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TypeClassificationEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TypeClassificationGraph extends TypeClassificationEOptionalId, IEntityCascadeGraph {
    classification?: ClassificationGraph;
    type?: TypeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TypeClassificationEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TypeClassificationECreateProperties extends Partial<TypeClassificationEId>, TypeClassificationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TypeClassificationECreateColumns extends TypeClassificationEId, TypeClassificationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QTypeClassification extends IQEntity {
    classification: QClassificationQRelation;
    type: QTypeQRelation;
}
export interface QTypeClassificationQId {
    classification: QClassificationQId;
    type: QTypeQId;
}
export interface QTypeClassificationQRelation extends IQRelation<QTypeClassification>, QTypeClassificationQId {
}
//# sourceMappingURL=qtypeclassification.d.ts.map