import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/air-control';
import {
	ISchemaProperty,
	SchemaPropertyEId,
	SchemaPropertyEOptionalId,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyESelect,
	QSchemaProperty,
	QSchemaPropertyQId,
	QSchemaPropertyQRelation,
} from './qschemaproperty';
import {
	ISchemaEntity,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from './qschemaentity';
import {
	ISchemaRelationColumn,
	SchemaRelationColumnEId,
	SchemaRelationColumnEOptionalId,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnESelect,
	QSchemaRelationColumn,
	QSchemaRelationColumnQId,
	QSchemaRelationColumnQRelation,
} from './qschemarelationcolumn';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaRelation {
	
	// Id Properties
	index?: number;

	// Id Relations
	property?: ISchemaProperty;

	// Non-Id Properties
	foreignKey?: ForeignKey;
	manyToOneElems?: ManyToOneElements;
	oneToManyElems?: OneToManyElements;
	relationType?: number;
	isRepositoryJoin?: boolean;
	isId?: boolean;
	addToJoinFunction?: string;
	joinFunctionWithOperator?: number;

	// Non-Id Relations
	relationEntity?: ISchemaEntity;
	manyRelationColumns?: ISchemaRelationColumn[];
	oneRelationColumns?: ISchemaRelationColumn[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationESelect
    extends IEntitySelectProperties, SchemaRelationEOptionalId, SchemaRelationEUpdateProperties {
	// Id Relations - full property interfaces
	property?: SchemaPropertyESelect;

  // Non-Id relations (including OneToMany's)
	relationEntity?: SchemaEntityESelect;
	manyRelationColumns?: SchemaRelationColumnESelect;
	oneRelationColumns?: SchemaRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;

	// Id Relations - Ids only
	property: SchemaPropertyEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationEOptionalId {
	// Id Properties
	index?: number | IQNumberField;

	// Id Relations - Ids only
	property?: SchemaPropertyEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: number | IQNumberField;
	isRepositoryJoin?: boolean | IQBooleanField;
	isId?: boolean | IQBooleanField;
	addToJoinFunction?: string | IQStringField;
	joinFunctionWithOperator?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	relationEntity?: SchemaEntityEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
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
export interface SchemaRelationECreateProperties
extends SchemaRelationEId, SchemaRelationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaRelationECreateColumns
extends SchemaRelationEId, SchemaRelationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaRelation extends QEntity
{
	// Id Fields
	index: IQNumberField;

	// Id Relations
	property: QSchemaPropertyQRelation;

	// Non-Id Fields
	foreignKey: IQStringField;
	manyToOneElems: IQStringField;
	oneToManyElems: IQStringField;
	relationType: IQNumberField;
	isRepositoryJoin: IQBooleanField;
	isId: IQBooleanField;
	addToJoinFunction: IQStringField;
	joinFunctionWithOperator: IQNumberField;

	// Non-Id Relations
	relationEntity: QSchemaEntityQRelation;
	manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;

}


// Entity Id Interface
export interface QSchemaRelationQId
{
	
	// Id Fields
	index: IQNumberField;

	// Id Relations
	property: QSchemaPropertyQId;


}

// Entity Relation Interface
export interface QSchemaRelationQRelation
	extends QRelation<QSchemaRelation>, QSchemaRelationQId {
}

