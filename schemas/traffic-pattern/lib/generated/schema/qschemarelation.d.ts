import { IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { IVersionedSchemaObject, VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectESelect, QVersionedSchemaObjectQId, QVersionedSchemaObjectQRelation, QVersionedSchemaObject } from './qversionedschemaobject';
import { ISchemaProperty, SchemaPropertyEOptionalId, SchemaPropertyESelect, QSchemaPropertyQRelation } from './qschemaproperty';
import { ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, QSchemaRelationColumn } from './qschemarelationcolumn';
export interface ISchemaRelation extends IVersionedSchemaObject {
    id?: number;
    index?: number;
    foreignKey?: ForeignKey;
    manyToOneElems?: ManyToOneElements;
    oneToManyElems?: OneToManyElements;
    relationType?: number;
    isId?: boolean;
    property?: ISchemaProperty;
    entity?: ISchemaEntity;
    relationEntity?: ISchemaEntity;
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationESelect extends VersionedSchemaObjectESelect, SchemaRelationEOptionalId {
    index?: number | IQNumberField;
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: number | IQNumberField;
    isId?: boolean | IQBooleanField;
    property?: SchemaPropertyESelect;
    entity?: SchemaEntityESelect;
    relationEntity?: SchemaEntityESelect;
    manyRelationColumns?: SchemaRelationColumnESelect;
    oneRelationColumns?: SchemaRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationEId extends VersionedSchemaObjectEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationEUpdateProperties extends VersionedSchemaObjectEUpdateProperties {
    index?: number | IQNumberField;
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: number | IQNumberField;
    isId?: boolean | IQBooleanField;
    property?: SchemaPropertyEOptionalId;
    entity?: SchemaEntityEOptionalId;
    relationEntity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationEUpdateColumns extends VersionedSchemaObjectEUpdateColumns {
    DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
    SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
    INDEX?: number | IQNumberField;
    FOREIGN_KEY?: string | IQStringField;
    MANY_TO_ONE_ELEMENTS?: string | IQStringField;
    ONE_TO_MANY_ELEMENTS?: string | IQStringField;
    RELATION_TYPE?: number | IQNumberField;
    IS_ID?: boolean | IQBooleanField;
    SCHEMA_PROPERTY_ID?: number | IQNumberField;
    SCHEMA_TABLE_ID?: number | IQNumberField;
    RELATION_SCHEMA_TABLE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaRelationECreateProperties extends Partial<SchemaRelationEId>, SchemaRelationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaRelationECreateColumns extends SchemaRelationEId, SchemaRelationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaRelation extends QVersionedSchemaObject {
    id: IQNumberField;
    index: IQNumberField;
    foreignKey: IQStringField;
    manyToOneElems: IQStringField;
    oneToManyElems: IQStringField;
    relationType: IQNumberField;
    isId: IQBooleanField;
    property: QSchemaPropertyQRelation;
    entity: QSchemaEntityQRelation;
    relationEntity: QSchemaEntityQRelation;
    manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
}
export interface QSchemaRelationQId extends QVersionedSchemaObjectQId {
    id: IQNumberField;
}
export interface QSchemaRelationQRelation extends QVersionedSchemaObjectQRelation<QSchemaRelation>, QSchemaRelationQId {
}
