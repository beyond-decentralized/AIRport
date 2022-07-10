import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { TypeClassificationGraph, TypeClassificationESelect, QTypeClassification } from './qtypeclassification';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TypeESelect extends IEntitySelectProperties, TypeEOptionalId {
    name?: string | IQStringField;
    typeClassifications?: TypeClassificationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TypeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TypeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TypeEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TypeGraph extends TypeEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
    typeClassifications?: TypeClassificationGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TypeEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TypeECreateProperties extends Partial<TypeEId>, TypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TypeECreateColumns extends TypeEId, TypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QType extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
    typeClassifications: IQOneToManyRelation<QTypeClassification>;
}
export interface QTypeQId {
    id: IQNumberField;
}
export interface QTypeQRelation extends IQRelation<QType>, QTypeQId {
}
//# sourceMappingURL=qtype.d.ts.map