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
	SchemaGraph,
	SchemaEId,
	SchemaEOptionalId,
	SchemaEUpdateProperties,
	SchemaESelect,
	QSchema,
	QSchemaQId,
	QSchemaQRelation,
} from './qschema';
import {
	Schema,
} from '../../ddl/schema/Schema';
import {
	SchemaVersionGraph,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
} from './qschemaversion';
import {
	SchemaVersion,
} from '../../ddl/schema/SchemaVersion';
import {
	SchemaCurrentVersion,
} from '../../ddl/schema/SchemaCurrentVersion';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaCurrentVersionESelect
    extends IEntitySelectProperties, SchemaCurrentVersionEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	schema?: SchemaESelect;
	schemaVersion?: SchemaVersionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaCurrentVersionEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	schema: SchemaEId;
	schemaVersion: SchemaVersionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaCurrentVersionEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	schema?: SchemaEOptionalId;
	schemaVersion?: SchemaVersionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaCurrentVersionEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaCurrentVersionGraph
	extends SchemaCurrentVersionEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	schema?: SchemaGraph;
	schemaVersion?: SchemaVersionGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaCurrentVersionEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaCurrentVersionECreateProperties
extends Partial<SchemaCurrentVersionEId>, SchemaCurrentVersionEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaCurrentVersionECreateColumns
extends SchemaCurrentVersionEId, SchemaCurrentVersionEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaCurrentVersion extends IQEntity<SchemaCurrentVersion>
{
	// Id Fields

	// Id Relations
	schema: QSchemaQRelation;
	schemaVersion: QSchemaVersionQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSchemaCurrentVersionQId
{
	
	// Id Fields

	// Id Relations
	schema: QSchemaQId;
	schemaVersion: QSchemaVersionQId;


}

// Entity Relation Interface
export interface QSchemaCurrentVersionQRelation
	extends IQRelation<SchemaCurrentVersion, QSchemaCurrentVersion>, QSchemaCurrentVersionQId {
}

