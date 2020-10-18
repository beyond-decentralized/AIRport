import { IQNumberField } from '@airport/air-control';
import { VersionedSchemaObjectGraph, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { SchemaColumnGraph, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQRelation } from './qschemacolumn';
import { SchemaRelationGraph, SchemaRelationEOptionalId, SchemaRelationESelect, QSchemaRelationQRelation } from './qschemarelation';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationColumnESelect extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId {
    manyColumn?: SchemaColumnESelect;
    oneColumn?: SchemaColumnESelect;
    manyRelation?: SchemaRelationESelect;
    oneRelation?: SchemaRelationESelect;
    parentRelation?: SchemaRelationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationColumnEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationColumnEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationColumnEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    manyColumn?: SchemaColumnEOptionalId;
    oneColumn?: SchemaColumnEOptionalId;
    manyRelation?: SchemaRelationEOptionalId;
    oneRelation?: SchemaRelationEOptionalId;
    parentRelation?: SchemaRelationEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaRelationColumnGraph extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId, VersionedSchemaObjectGraph {
    manyColumn?: SchemaColumnGraph;
    oneColumn?: SchemaColumnGraph;
    manyRelation?: SchemaRelationGraph;
    oneRelation?: SchemaRelationGraph;
    parentRelation?: SchemaRelationGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationColumnEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    MANY_SCHEMA_COLUMN_ID?: number | IQNumberField;
    ONE_SCHEMA_COLUMN_ID?: number | IQNumberField;
    MANY_SCHEMA_RELATION_ID?: number | IQNumberField;
    ONE_SCHEMA_RELATION_ID?: number | IQNumberField;
    PARENT_RELATION_ID?: number | IQNumberField;
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
    id: IQNumberField;
    manyColumn: QSchemaColumnQRelation;
    oneColumn: QSchemaColumnQRelation;
    manyRelation: QSchemaRelationQRelation;
    oneRelation: QSchemaRelationQRelation;
    parentRelation: QSchemaRelationQRelation;
}
export interface QSchemaRelationColumnQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaRelationColumnQRelation extends QVersionedSchemaObjectQRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}
//# sourceMappingURL=qschemarelationcolumn.d.ts.map