import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
import { ISchemaColumn, SchemaColumnEId, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQId, QSchemaColumnQRelation } from './qschemacolumn';
import { ISchemaRelation, SchemaRelationEId, SchemaRelationEOptionalId, SchemaRelationESelect, QSchemaRelationQId, QSchemaRelationQRelation } from './qschemarelation';
export interface ISchemaRelationColumn {
    manyColumn?: ISchemaColumn;
    oneColumn?: ISchemaColumn;
    manyRelation?: ISchemaRelation;
    oneRelation?: ISchemaRelation;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationColumnESelect extends IEntitySelectProperties, SchemaRelationColumnEOptionalId, SchemaRelationColumnEUpdateProperties {
    manyColumn?: SchemaColumnESelect;
    oneColumn?: SchemaColumnESelect;
    manyRelation?: SchemaRelationESelect;
    oneRelation?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationColumnEId extends IEntityIdProperties {
    manyColumn: SchemaColumnEId;
    oneColumn: SchemaColumnEId;
    manyRelation: SchemaRelationEId;
    oneRelation: SchemaRelationEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationColumnEOptionalId {
    manyColumn?: SchemaColumnEOptionalId;
    oneColumn?: SchemaColumnEOptionalId;
    manyRelation?: SchemaRelationEOptionalId;
    oneRelation?: SchemaRelationEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationColumnEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationColumnEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaRelationColumnECreateProperties extends Partial<SchemaRelationColumnEId>, SchemaRelationColumnEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaRelationColumnECreateColumns extends SchemaRelationColumnEId, SchemaRelationColumnEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaRelationColumn extends QEntity {
    manyColumn: QSchemaColumnQRelation;
    oneColumn: QSchemaColumnQRelation;
    manyRelation: QSchemaRelationQRelation;
    oneRelation: QSchemaRelationQRelation;
}
export interface QSchemaRelationColumnQId {
    manyColumn: QSchemaColumnQId;
    oneColumn: QSchemaColumnQId;
    manyRelation: QSchemaRelationQId;
    oneRelation: QSchemaRelationQId;
}
export interface QSchemaRelationColumnQRelation extends QRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}
