import { IQNumberField } from '@airport/air-control';
import { IVersionedSchemaObject, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { ISchemaColumn, SchemaColumnEId, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQId, QSchemaColumnQRelation } from './qschemacolumn';
import { ISchemaRelation, SchemaRelationEId, SchemaRelationEOptionalId, SchemaRelationESelect, QSchemaRelationQId, QSchemaRelationQRelation } from './qschemarelation';
export interface ISchemaRelationColumn extends IVersionedSchemaObject {
    manyColumn?: ISchemaColumn;
    oneColumn?: ISchemaColumn;
    manyRelation?: ISchemaRelation;
    oneRelation?: ISchemaRelation;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationColumnESelect extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId {
    manyColumn?: SchemaColumnESelect;
    oneColumn?: SchemaColumnESelect;
    manyRelation?: SchemaRelationESelect;
    oneRelation?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationColumnEId extends VersionedSchemaObjectEId {
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
export interface SchemaRelationColumnEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationColumnEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
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
export interface QSchemaRelationColumn extends QVersionedSchemaObject {
    manyColumn: QSchemaColumnQRelation;
    oneColumn: QSchemaColumnQRelation;
    manyRelation: QSchemaRelationQRelation;
    oneRelation: QSchemaRelationQRelation;
}
export interface QSchemaRelationColumnQId extends QVersionedSchemaObjectQId {
    manyColumn: QSchemaColumnQId;
    oneColumn: QSchemaColumnQId;
    manyRelation: QSchemaRelationQId;
    oneRelation: QSchemaRelationQId;
}
export interface QSchemaRelationColumnQRelation extends QVersionedSchemaObjectQRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}
