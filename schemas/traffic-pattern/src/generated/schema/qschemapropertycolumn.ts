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
	ISchemaColumn,
	SchemaColumnEId,
	SchemaColumnEOptionalId,
	SchemaColumnEUpdateProperties,
	SchemaColumnESelect,
	QSchemaColumn,
	QSchemaColumnQId,
	QSchemaColumnQRelation,
} from './qschemacolumn';
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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaPropertyColumn {
	
	// Id Properties

	// Id Relations
	column?: ISchemaColumn;
	property?: ISchemaProperty;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyColumnESelect
    extends IEntitySelectProperties, SchemaPropertyColumnEOptionalId, SchemaPropertyColumnEUpdateProperties {
	// Id Relations - full property interfaces
	column?: SchemaColumnESelect;
	property?: SchemaPropertyESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyColumnEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	column: SchemaColumnEId;
	property: SchemaPropertyEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyColumnEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	column?: SchemaColumnEOptionalId;
	property?: SchemaPropertyEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyColumnEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyColumnEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaPropertyColumnECreateProperties
extends Partial<SchemaPropertyColumnEId>, SchemaPropertyColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaPropertyColumnECreateColumns
extends SchemaPropertyColumnEId, SchemaPropertyColumnEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaPropertyColumn extends QEntity
{
	// Id Fields

	// Id Relations
	column: QSchemaColumnQRelation;
	property: QSchemaPropertyQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSchemaPropertyColumnQId
{
	
	// Id Fields

	// Id Relations
	column: QSchemaColumnQId;
	property: QSchemaPropertyQId;


}

// Entity Relation Interface
export interface QSchemaPropertyColumnQRelation
	extends QRelation<QSchemaPropertyColumn>, QSchemaPropertyColumnQId {
}

