import { IQNumberField, IQStringField } from '@airport/air-control';
import { VersionedSchemaObjectGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { Operation_Rule } from '@airport/ground-control';
import { SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaOperationESelect extends VersionedSchemaObjectESelect, SchemaOperationEOptionalId {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: SchemaEntityESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaOperationEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaOperationEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaOperationEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaOperationGraph extends SchemaOperationEOptionalId, VersionedSchemaObjectGraph {
    type?: number | IQNumberField;
    name?: string | IQStringField;
    rule?: Operation_Rule | IQStringField;
    entity?: SchemaEntityGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaOperationEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    TYPE?: number | IQNumberField;
    NAME?: string | IQStringField;
    RULE?: string | IQStringField;
    SCHEMA_ENTITY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaOperationECreateProperties extends Partial<SchemaOperationEId>, SchemaOperationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaOperationECreateColumns extends SchemaOperationEId, SchemaOperationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaOperation extends QVersionedSchemaObject {
    id: IQNumberField;
    type: IQNumberField;
    name: IQStringField;
    rule: IQStringField;
    entity: QSchemaEntityQRelation;
}
export interface QSchemaOperationQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaOperationQRelation extends QVersionedSchemaObjectQRelation<QSchemaOperation>, QSchemaOperationQId {
}
//# sourceMappingURL=qschemaoperation.d.ts.map