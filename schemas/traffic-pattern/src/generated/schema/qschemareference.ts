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
	ISchemaVersion,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
} from './qschemaversion';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaReference {
	
	// Id Properties

	// Id Relations
	ownSchemaVersion?: ISchemaVersion;
	referencedSchemaVersion?: ISchemaVersion;

	// Non-Id Properties
	index?: number;

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
export interface SchemaReferenceESelect
    extends IEntitySelectProperties, SchemaReferenceEOptionalId, SchemaReferenceEUpdateProperties {
	// Id Relations - full property interfaces
	ownSchemaVersion?: SchemaVersionESelect;
	referencedSchemaVersion?: SchemaVersionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaReferenceEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	ownSchemaVersion: SchemaVersionEId;
	referencedSchemaVersion: SchemaVersionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaReferenceEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	ownSchemaVersion?: SchemaVersionEOptionalId;
	referencedSchemaVersion?: SchemaVersionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaReferenceEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaReferenceEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaReferenceECreateProperties
extends SchemaReferenceEId, SchemaReferenceEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaReferenceECreateColumns
extends SchemaReferenceEId, SchemaReferenceEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaReference extends QEntity
{
	// Id Fields

	// Id Relations
	ownSchemaVersion: QSchemaVersionQRelation;
	referencedSchemaVersion: QSchemaVersionQRelation;

	// Non-Id Fields
	index: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSchemaReferenceQId
{
	
	// Id Fields

	// Id Relations
	ownSchemaVersion: QSchemaVersionQId;
	referencedSchemaVersion: QSchemaVersionQId;


}

// Entity Relation Interface
export interface QSchemaReferenceQRelation
	extends QRelation<QSchemaReference>, QSchemaReferenceQId {
}

