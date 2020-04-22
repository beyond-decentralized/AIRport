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
export interface VersionedSchemaObjectESelect
    extends IEntitySelectProperties, VersionedSchemaObjectEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	deprecatedSinceVersion?: SchemaVersionESelect;
	removedInVersion?: SchemaVersionESelect;
	sinceVersion?: SchemaVersionESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface VersionedSchemaObjectEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface VersionedSchemaObjectEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface VersionedSchemaObjectEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	deprecatedSinceVersion?: SchemaVersionEOptionalId;
	removedInVersion?: SchemaVersionEOptionalId;
	sinceVersion?: SchemaVersionEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface VersionedSchemaObjectECascadeGraph
	extends IEntitySelectProperties, VersionedSchemaObjectEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	deprecatedSinceVersion?: SchemaVersionESelect;
	removedInVersion?: SchemaVersionESelect;
	sinceVersion?: SchemaVersionESelect;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface VersionedSchemaObjectEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface VersionedSchemaObjectECreateProperties
extends Partial<VersionedSchemaObjectEId>, VersionedSchemaObjectEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface VersionedSchemaObjectECreateColumns
extends VersionedSchemaObjectEId, VersionedSchemaObjectEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QVersionedSchemaObject extends IQEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	deprecatedSinceVersion: QSchemaVersionQRelation;
	removedInVersion: QSchemaVersionQRelation;
	sinceVersion: QSchemaVersionQRelation;

}


// Entity Id Interface
export interface QVersionedSchemaObjectQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QVersionedSchemaObjectQRelation<SubType extends IQEntity>
	extends IQRelation<SubType>, QVersionedSchemaObjectQId {
}

