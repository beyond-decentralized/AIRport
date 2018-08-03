import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation, ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { ISchemaProperty, SchemaPropertyEId, SchemaPropertyEOptionalId, SchemaPropertyESelect, QSchemaPropertyQId, QSchemaPropertyQRelation } from './qschemaproperty';
import { ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from './qschemaentity';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, QSchemaRelationColumn } from './qschemarelationcolumn';
export interface ISchemaRelation {
    index?: number;
    property?: ISchemaProperty;
    foreignKey?: ForeignKey;
    manyToOneElems?: ManyToOneElements;
    oneToManyElems?: OneToManyElements;
    relationType?: number;
    isRepositoryJoin?: boolean;
    isId?: boolean;
    addToJoinFunction?: string;
    joinFunctionWithOperator?: number;
    relationEntity?: ISchemaEntity;
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationESelect extends IEntitySelectProperties, SchemaRelationEOptionalId, SchemaRelationEUpdateProperties {
    property?: SchemaPropertyESelect;
    relationEntity?: SchemaEntityESelect;
    manyRelationColumns?: SchemaRelationColumnESelect;
    oneRelationColumns?: SchemaRelationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationEId extends IEntityIdProperties {
    index: number | IQNumberField;
    property: SchemaPropertyEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationEOptionalId {
    index?: number | IQNumberField;
    property?: SchemaPropertyEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationEUpdateProperties extends IEntityUpdateProperties {
    foreignKey?: ForeignKey | IQStringField;
    manyToOneElems?: ManyToOneElements | IQStringField;
    oneToManyElems?: OneToManyElements | IQStringField;
    relationType?: number | IQNumberField;
    isRepositoryJoin?: boolean | IQBooleanField;
    isId?: boolean | IQBooleanField;
    addToJoinFunction?: string | IQStringField;
    joinFunctionWithOperator?: number | IQNumberField;
    relationEntity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationEUpdateColumns extends IEntityUpdateColumns {
    FOREIGN_KEY?: string | IQStringField;
    MANY_TO_ONE_ELEMENTS?: string | IQStringField;
    ONE_TO_MANY_ELEMENTS?: string | IQStringField;
    RELATION_TYPE?: number | IQNumberField;
    IS_REPOSITORY_JOIN?: boolean | IQBooleanField;
    IS_ID?: boolean | IQBooleanField;
    ADD_TO_JOIN_FUNCTION?: string | IQStringField;
    JOIN_FUNCTION_WITH_OPERATOR?: number | IQNumberField;
    RELATION_SCHEMA_VERSION_ID?: number | IQNumberField;
    RELATION_TABLE_INDEX?: number | IQNumberField;
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
export interface QSchemaRelation extends QEntity {
    index: IQNumberField;
    property: QSchemaPropertyQRelation;
    foreignKey: IQStringField;
    manyToOneElems: IQStringField;
    oneToManyElems: IQStringField;
    relationType: IQNumberField;
    isRepositoryJoin: IQBooleanField;
    isId: IQBooleanField;
    addToJoinFunction: IQStringField;
    joinFunctionWithOperator: IQNumberField;
    relationEntity: QSchemaEntityQRelation;
    manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
    oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
}
export interface QSchemaRelationQId {
    index: IQNumberField;
    property: QSchemaPropertyQId;
}
export interface QSchemaRelationQRelation extends QRelation<QSchemaRelation>, QSchemaRelationQId {
}
