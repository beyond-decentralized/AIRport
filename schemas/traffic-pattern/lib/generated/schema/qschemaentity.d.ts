import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, TableConfiguration } from '@airport/air-control';
import { VersionedSchemaObjectECascadeGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation } from './qschemaversion';
import { SchemaColumnESelect, QSchemaColumn } from './qschemacolumn';
import { SchemaOperationESelect, QSchemaOperation } from './qschemaoperation';
import { SchemaPropertyESelect, QSchemaProperty } from './qschemaproperty';
import { SchemaRelationESelect, QSchemaRelation } from './qschemarelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaEntityESelect extends VersionedSchemaObjectESelect, SchemaEntityEOptionalId {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isRepositoryEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    schemaVersion?: SchemaVersionESelect;
    columns?: SchemaColumnESelect;
    operations?: SchemaOperationESelect;
    properties?: SchemaPropertyESelect;
    relations?: SchemaRelationESelect;
    relationReferences?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEntityEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEntityEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEntityEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isRepositoryEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    schemaVersion?: SchemaVersionEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaEntityECascadeGraph extends VersionedSchemaObjectESelect, SchemaEntityEOptionalId, VersionedSchemaObjectECascadeGraph {
    index?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    isRepositoryEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
    schemaVersion?: SchemaVersionESelect;
    columns?: SchemaColumnESelect;
    operations?: SchemaOperationESelect;
    properties?: SchemaPropertyESelect;
    relations?: SchemaRelationESelect;
    relationReferences?: SchemaRelationESelect;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEntityEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    TABLE_INDEX?: number | IQNumberField;
    IS_LOCAL?: boolean | IQBooleanField;
    IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
    NAME?: string | IQStringField;
    TABLE_CONFIGURATION?: string | IQStringField;
    SCHEMA_VERSION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaEntityECreateProperties extends Partial<SchemaEntityEId>, SchemaEntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaEntityECreateColumns extends SchemaEntityEId, SchemaEntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaEntity extends QVersionedSchemaObject {
    id: IQNumberField;
    index: IQNumberField;
    isLocal: IQBooleanField;
    isRepositoryEntity: IQBooleanField;
    name: IQStringField;
    tableConfig: IQStringField;
    schemaVersion: QSchemaVersionQRelation;
    columns: IQOneToManyRelation<QSchemaColumn>;
    operations: IQOneToManyRelation<QSchemaOperation>;
    properties: IQOneToManyRelation<QSchemaProperty>;
    relations: IQOneToManyRelation<QSchemaRelation>;
    relationReferences: IQOneToManyRelation<QSchemaRelation>;
}
export interface QSchemaEntityQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaEntityQRelation extends QVersionedSchemaObjectQRelation<QSchemaEntity>, QSchemaEntityQId {
}
//# sourceMappingURL=qschemaentity.d.ts.map