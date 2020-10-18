import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/air-control';
import { VersionedSchemaObjectGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
import { SchemaPropertyColumnGraph, SchemaPropertyColumnESelect, QSchemaPropertyColumn } from './qschemapropertycolumn';
import { SchemaRelationGraph, SchemaRelationESelect, QSchemaRelation } from './qschemarelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyESelect extends VersionedSchemaObjectESelect, SchemaPropertyEOptionalId {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: SchemaEntityESelect;
    propertyColumns?: SchemaPropertyColumnESelect;
    relation?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaPropertyGraph extends SchemaPropertyEOptionalId, VersionedSchemaObjectGraph {
    index?: number | IQNumberField;
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
    entity?: SchemaEntityGraph;
    propertyColumns?: SchemaPropertyColumnGraph[];
    relation?: SchemaRelationGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    PROPERTY_INDEX?: number | IQNumberField;
    NAME?: string | IQStringField;
    IS_ID?: boolean | IQBooleanField;
    SCHEMA_ENTITY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaPropertyECreateProperties extends Partial<SchemaPropertyEId>, SchemaPropertyEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaPropertyECreateColumns extends SchemaPropertyEId, SchemaPropertyEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaProperty extends QVersionedSchemaObject {
    id: IQNumberField;
    index: IQNumberField;
    name: IQStringField;
    isId: IQBooleanField;
    entity: QSchemaEntityQRelation;
    propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
    relation: IQOneToManyRelation<QSchemaRelation>;
}
export interface QSchemaPropertyQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaPropertyQRelation extends QVersionedSchemaObjectQRelation<QSchemaProperty>, QSchemaPropertyQId {
}
//# sourceMappingURL=qschemaproperty.d.ts.map