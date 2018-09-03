import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, TableConfiguration } from '@airport/air-control';
import { IVersionedSchemaObject, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { ISchemaColumn, SchemaColumnESelect, QSchemaColumn } from './qschemacolumn';
import { ISchemaProperty, SchemaPropertyESelect, QSchemaProperty } from './qschemaproperty';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation } from './qschemaversion';
import { ISchemaRelation, SchemaRelationESelect, QSchemaRelation } from './qschemarelation';
export interface ISchemaEntity extends IVersionedSchemaObject {
    id?: number;
    index?: number;
    isLocal?: boolean;
    isRepositoryEntity?: boolean;
    name?: string;
    tableConfig?: TableConfiguration;
    schemaVersion?: ISchemaVersion;
    columns?: ISchemaColumn[];
    properties?: ISchemaProperty[];
    relations?: ISchemaRelation[];
    relationReferences?: ISchemaRelation[];
    columnMap?: {
        [name: string]: ISchemaColumn;
    };
    idColumns?: ISchemaColumn[];
    idColumnMap?: {
        [name: string]: ISchemaColumn;
    };
    propertyMap?: {
        [name: string]: ISchemaProperty;
    };
}
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
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEntityEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    INDEX?: number | IQNumberField;
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
    properties: IQOneToManyRelation<QSchemaProperty>;
    relations: IQOneToManyRelation<QSchemaRelation>;
    relationReferences: IQOneToManyRelation<QSchemaRelation>;
}
export interface QSchemaEntityQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaEntityQRelation extends QVersionedSchemaObjectQRelation<QSchemaEntity>, QSchemaEntityQId {
}
