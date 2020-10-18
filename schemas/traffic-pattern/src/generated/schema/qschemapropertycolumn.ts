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
	VersionedSchemaObjectGraph,
	VersionedSchemaObjectEId,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectESelect,
	QVersionedSchemaObjectQId,
	QVersionedSchemaObjectQRelation,
	QVersionedSchemaObject,
} from './qversionedschemaobject';
import {
	SchemaColumnGraph,
	SchemaColumnEId,
	SchemaColumnEOptionalId,
	SchemaColumnEUpdateProperties,
	SchemaColumnESelect,
	QSchemaColumn,
	QSchemaColumnQId,
	QSchemaColumnQRelation,
} from './qschemacolumn';
import {
	SchemaPropertyGraph,
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
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyColumnESelect
    extends VersionedSchemaObjectESelect, SchemaPropertyColumnEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	column?: SchemaColumnESelect;
	property?: SchemaPropertyESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyColumnEId
    extends VersionedSchemaObjectEId {
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
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaPropertyColumnGraph
	extends VersionedSchemaObjectESelect, SchemaPropertyColumnEOptionalId, VersionedSchemaObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	column?: SchemaColumnGraph;
	property?: SchemaPropertyGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyColumnEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;

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
export interface QSchemaPropertyColumn extends QVersionedSchemaObject
{
	// Id Fields

	// Id Relations
	column: QSchemaColumnQRelation;
	property: QSchemaPropertyQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSchemaPropertyColumnQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields

	// Id Relations
	column: QSchemaColumnQId;
	property: QSchemaPropertyQId;


}

// Entity Relation Interface
export interface QSchemaPropertyColumnQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaPropertyColumn>, QSchemaPropertyColumnQId {
}

