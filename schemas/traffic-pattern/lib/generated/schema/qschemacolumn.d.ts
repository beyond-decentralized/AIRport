import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField } from '@airport/air-control';
import { IVersionedSchemaObject, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, QSchemaPropertyColumn } from './qschemapropertycolumn';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, QSchemaRelationColumn } from './qschemarelationcolumn';
export interface ISchemaColumn extends IVersionedSchemaObject {
    id?: number;
    index?: number;
    idIndex?: number;
    isGenerated?: boolean;
    allocationSize?: number;
    name?: string;
    type?: number;
    entity?: ISchemaEntity;
    propertyColumns?: ISchemaPropertyColumn[];
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaColumnESelect extends VersionedSchemaObjectESelect, SchemaColumnEOptionalId {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    type?: number | IQNumberField;
    entity?: SchemaEntityESelect;
    propertyColumns?: SchemaPropertyColumnESelect;
    manyRelationColumns?: SchemaRelationColumnESelect;
    oneRelationColumns?: SchemaRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaColumnEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaColumnEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaColumnEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: number | IQNumberField;
    name?: string | IQStringField;
    type?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaColumnEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    INDEX?: number | IQNumberField;
    ID_INDEX?: number | IQNumberField;
    IS_GENERATED?: boolean | IQBooleanField;
    ALLOCATION_SIZE?: number | IQNumberField;
    NAME?: string | IQStringField;
    TYPE?: number | IQNumberField;
    SCHEMA_ENTITY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaColumnECreateProperties extends Partial<SchemaColumnEId>, SchemaColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaColumnECreateColumns extends SchemaColumnEId, SchemaColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaColumn extends QVersionedSchemaObject {
    id: IQNumberField;
    index: IQNumberField;
    idIndex: IQNumberField;
    isGenerated: IQBooleanField;
    allocationSize: IQNumberField;
    name: IQStringField;
    type: IQNumberField;
    entity: QSchemaEntityQRelation;
    propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
    manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
}
export interface QSchemaColumnQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaColumnQRelation extends QVersionedSchemaObjectQRelation<QSchemaColumn>, QSchemaColumnQId {
}
