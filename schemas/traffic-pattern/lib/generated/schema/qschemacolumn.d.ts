import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, QSchemaPropertyColumn } from './qschemapropertycolumn';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, QSchemaRelationColumn } from './qschemarelationcolumn';
export interface ISchemaColumn {
    index?: number;
    tableIndex?: number;
    schemaVersionId?: number;
    idIndex?: number;
    isGenerated?: boolean;
    allocationSize?: boolean;
    name?: string;
    type?: number;
    propertyColumns?: ISchemaPropertyColumn[];
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaColumnESelect extends IEntitySelectProperties, SchemaColumnEOptionalId, SchemaColumnEUpdateProperties {
    propertyColumns?: SchemaPropertyColumnESelect;
    manyRelationColumns?: SchemaRelationColumnESelect;
    oneRelationColumns?: SchemaRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaColumnEId extends IEntityIdProperties {
    index: number | IQNumberField;
    tableIndex: number | IQNumberField;
    schemaVersionId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaColumnEOptionalId {
    index?: number | IQNumberField;
    tableIndex?: number | IQNumberField;
    schemaVersionId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaColumnEUpdateProperties extends IEntityUpdateProperties {
    idIndex?: number | IQNumberField;
    isGenerated?: boolean | IQBooleanField;
    allocationSize?: boolean | IQBooleanField;
    name?: string | IQStringField;
    type?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaColumnEUpdateColumns extends IEntityUpdateColumns {
    ID_INDEX?: number | IQNumberField;
    IS_GENERATED?: boolean | IQBooleanField;
    ALLOCATION_SIZE?: boolean | IQBooleanField;
    NAME?: string | IQStringField;
    TYPE?: number | IQNumberField;
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
export interface QSchemaColumn extends QEntity {
    index: IQNumberField;
    tableIndex: IQNumberField;
    schemaVersionId: IQNumberField;
    idIndex: IQNumberField;
    isGenerated: IQBooleanField;
    allocationSize: IQBooleanField;
    name: IQStringField;
    type: IQNumberField;
    propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
    manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
}
export interface QSchemaColumnQId {
    index: IQNumberField;
    tableIndex: IQNumberField;
    schemaVersionId: IQNumberField;
}
export interface QSchemaColumnQRelation extends QRelation<QSchemaColumn>, QSchemaColumnQId {
}
