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
} from '@airport/air-control';
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
	ISchemaPropertyColumn,
	SchemaPropertyColumnEId,
	SchemaPropertyColumnEOptionalId,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnESelect,
	QSchemaPropertyColumn,
	QSchemaPropertyColumnQId,
	QSchemaPropertyColumnQRelation,
} from './qschemapropertycolumn';
import {
	ISchemaRelation,
	SchemaRelationEId,
	SchemaRelationEOptionalId,
	SchemaRelationEUpdateProperties,
	SchemaRelationESelect,
	QSchemaRelation,
	QSchemaRelationQId,
	QSchemaRelationQRelation,
} from './qschemarelation';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaProperty {
	
	// Id Properties
	index?: number;

	// Id Relations
	entity?: ISchemaEntity;

	// Non-Id Properties
	name?: string;
	isId?: boolean;

	// Non-Id Relations
	propertyColumns?: ISchemaPropertyColumn[];
	relation?: ISchemaRelation[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyESelect
    extends IEntitySelectProperties, SchemaPropertyEOptionalId, SchemaPropertyEUpdateProperties {
	// Id Relations - full property interfaces
	entity?: SchemaEntityESelect;

  // Non-Id relations (including OneToMany's)
	propertyColumns?: SchemaPropertyColumnESelect;
	relation?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;

	// Id Relations - Ids only
	entity: SchemaEntityEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyEOptionalId {
	// Id Properties
	index?: number | IQNumberField;

	// Id Relations - Ids only
	entity?: SchemaEntityEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	IS_ID?: boolean | IQBooleanField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaPropertyECreateProperties
extends SchemaPropertyEId, SchemaPropertyEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaPropertyECreateColumns
extends SchemaPropertyEId, SchemaPropertyEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaProperty extends QEntity
{
	// Id Fields
	index: IQNumberField;

	// Id Relations
	entity: QSchemaEntityQRelation;

	// Non-Id Fields
	name: IQStringField;
	isId: IQBooleanField;

	// Non-Id Relations
	propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
	relation: IQOneToManyRelation<QSchemaRelation>;

}


// Entity Id Interface
export interface QSchemaPropertyQId
{
	
	// Id Fields
	index: IQNumberField;

	// Id Relations
	entity: QSchemaEntityQId;


}

// Entity Relation Interface
export interface QSchemaPropertyQRelation
	extends QRelation<QSchemaProperty>, QSchemaPropertyQId {
}

