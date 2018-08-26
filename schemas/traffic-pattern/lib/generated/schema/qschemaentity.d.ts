import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation, TableConfiguration } from '@airport/air-control';
import { ISchemaColumn, SchemaColumnESelect, QSchemaColumn } from './qschemacolumn';
import { ISchemaProperty, SchemaPropertyESelect, QSchemaProperty } from './qschemaproperty';
import { ISchemaVersion, SchemaVersionEId, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQId, QSchemaVersionQRelation } from './qschemaversion';
import { ISchemaRelation, SchemaRelationESelect, QSchemaRelation } from './qschemarelation';
export interface ISchemaEntity {
    index?: number;
    schemaVersion?: ISchemaVersion;
    isLocal?: boolean;
    isRepositoryEntity?: boolean;
    name?: string;
    tableConfig?: TableConfiguration;
    columns?: ISchemaColumn[];
    properties?: ISchemaProperty[];
    relations?: ISchemaRelation[];
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
export interface SchemaEntityESelect extends IEntitySelectProperties, SchemaEntityEOptionalId, SchemaEntityEUpdateProperties {
    schemaVersion?: SchemaVersionESelect;
    columns?: SchemaColumnESelect;
    properties?: SchemaPropertyESelect;
    relations?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEntityEId extends IEntityIdProperties {
    index: number | IQNumberField;
    schemaVersion: SchemaVersionEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEntityEOptionalId {
    index?: number | IQNumberField;
    schemaVersion?: SchemaVersionEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEntityEUpdateProperties extends IEntityUpdateProperties {
    isLocal?: boolean | IQBooleanField;
    isRepositoryEntity?: boolean | IQBooleanField;
    name?: string | IQStringField;
    tableConfig?: TableConfiguration | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEntityEUpdateColumns extends IEntityUpdateColumns {
    IS_LOCAL?: boolean | IQBooleanField;
    IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
    NAME?: string | IQStringField;
    TABLECONFIG?: string | IQStringField;
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
export interface QSchemaEntity extends QEntity {
    index: IQNumberField;
    schemaVersion: QSchemaVersionQRelation;
    isLocal: IQBooleanField;
    isRepositoryEntity: IQBooleanField;
    name: IQStringField;
    tableConfig: IQStringField;
    columns: IQOneToManyRelation<QSchemaColumn>;
    properties: IQOneToManyRelation<QSchemaProperty>;
    relations: IQOneToManyRelation<QSchemaRelation>;
}
export interface QSchemaEntityQId {
    index: IQNumberField;
    schemaVersion: QSchemaVersionQId;
}
export interface QSchemaEntityQRelation extends QRelation<QSchemaEntity>, QSchemaEntityQId {
}
