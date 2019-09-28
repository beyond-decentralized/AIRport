import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	VersionedSchemaObjectECascadeGraph,
	VersionedSchemaObjectEId,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectESelect,
	QVersionedSchemaObjectQId,
	QVersionedSchemaObjectQRelation,
	QVersionedSchemaObject,
} from './qversionedschemaobject';
import {
	SchemaVersionECascadeGraph,
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
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaReferenceESelect
    extends VersionedSchemaObjectESelect, SchemaReferenceEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;

	// Id Relations - full property interfaces
	ownSchemaVersion?: SchemaVersionESelect;
	referencedSchemaVersion?: SchemaVersionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaReferenceEId
    extends VersionedSchemaObjectEId {
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
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaReferenceECascadeGraph
	extends VersionedSchemaObjectECascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaReferenceEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	SCHEMA_REFERENCE_INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaReferenceECreateProperties
extends Partial<SchemaReferenceEId>, SchemaReferenceEUpdateProperties {
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
export interface QSchemaReference extends QVersionedSchemaObject
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
export interface QSchemaReferenceQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields

	// Id Relations
	ownSchemaVersion: QSchemaVersionQId;
	referencedSchemaVersion: QSchemaVersionQId;


}

// Entity Relation Interface
export interface QSchemaReferenceQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaReference>, QSchemaReferenceQId {
}

