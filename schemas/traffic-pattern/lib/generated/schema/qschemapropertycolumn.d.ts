import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
import { ISchemaColumn, SchemaColumnEId, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQId, QSchemaColumnQRelation } from './qschemacolumn';
import { ISchemaProperty, SchemaPropertyEId, SchemaPropertyEOptionalId, SchemaPropertyESelect, QSchemaPropertyQId, QSchemaPropertyQRelation } from './qschemaproperty';
export interface ISchemaPropertyColumn {
    column?: ISchemaColumn;
    property?: ISchemaProperty;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyColumnESelect extends IEntitySelectProperties, SchemaPropertyColumnEOptionalId, SchemaPropertyColumnEUpdateProperties {
    column?: SchemaColumnESelect;
    property?: SchemaPropertyESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyColumnEId extends IEntityIdProperties {
    column: SchemaColumnEId;
    property: SchemaPropertyEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyColumnEOptionalId {
    column?: SchemaColumnEOptionalId;
    property?: SchemaPropertyEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyColumnEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyColumnEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaPropertyColumnECreateProperties extends SchemaPropertyColumnEId, SchemaPropertyColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaPropertyColumnECreateColumns extends SchemaPropertyColumnEId, SchemaPropertyColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaPropertyColumn extends QEntity {
    column: QSchemaColumnQRelation;
    property: QSchemaPropertyQRelation;
}
export interface QSchemaPropertyColumnQId {
    column: QSchemaColumnQId;
    property: QSchemaPropertyQId;
}
export interface QSchemaPropertyColumnQRelation extends QRelation<QSchemaPropertyColumn>, QSchemaPropertyColumnQId {
}
