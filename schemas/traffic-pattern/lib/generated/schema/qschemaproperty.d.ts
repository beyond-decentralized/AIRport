import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISchemaEntity, SchemaEntityEId, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQId, QSchemaEntityQRelation } from './qschemaentity';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, QSchemaPropertyColumn } from './qschemapropertycolumn';
import { ISchemaRelation, SchemaRelationESelect, QSchemaRelation } from './qschemarelation';
export interface ISchemaProperty {
    index?: number;
    entity?: ISchemaEntity;
    name?: string;
    isId?: boolean;
    propertyColumns?: ISchemaPropertyColumn[];
    relation?: ISchemaRelation[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyESelect extends IEntitySelectProperties, SchemaPropertyEOptionalId, SchemaPropertyEUpdateProperties {
    entity?: SchemaEntityESelect;
    propertyColumns?: SchemaPropertyColumnESelect;
    relation?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyEId extends IEntityIdProperties {
    index: number | IQNumberField;
    entity: SchemaEntityEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyEOptionalId {
    index?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    isId?: boolean | IQBooleanField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    IS_ID?: boolean | IQBooleanField;
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
export interface QSchemaProperty extends QEntity {
    index: IQNumberField;
    entity: QSchemaEntityQRelation;
    name: IQStringField;
    isId: IQBooleanField;
    propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
    relation: IQOneToManyRelation<QSchemaRelation>;
}
export interface QSchemaPropertyQId {
    index: IQNumberField;
    entity: QSchemaEntityQId;
}
export interface QSchemaPropertyQRelation extends QRelation<QSchemaProperty>, QSchemaPropertyQId {
}
