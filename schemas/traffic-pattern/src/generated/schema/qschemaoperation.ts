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
	Operation_Rule,
} from '@airport/ground-control';
import {
	SchemaEntityGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from './qschemaentity';
import {
	SchemaEntity,
} from '../../ddl/schema/SchemaEntity';
import {
	SchemaOperation,
} from '../../ddl/schema/SchemaOperation';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaOperationESelect
    extends VersionedSchemaObjectESelect, SchemaOperationEOptionalId {
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: SchemaEntityESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaOperationEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaOperationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaOperationEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: SchemaEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaOperationGraph
	extends SchemaOperationEOptionalId, VersionedSchemaObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Relations
	entity?: SchemaEntityGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaOperationEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	TYPE?: number | IQNumberField;
	NAME?: string | IQStringField;
	RULE?: string | IQStringField;
	SCHEMA_ENTITY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaOperationECreateProperties
extends Partial<SchemaOperationEId>, SchemaOperationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaOperationECreateColumns
extends SchemaOperationEId, SchemaOperationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaOperation extends QVersionedSchemaObject<SchemaOperation>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	type: IQNumberField;
	name: IQStringField;
	rule: IQStringField;

	// Non-Id Relations
	entity: QSchemaEntityQRelation;

}


// Entity Id Interface
export interface QSchemaOperationQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaOperationQRelation
	extends QVersionedSchemaObjectQRelation<SchemaOperation, QSchemaOperation>, QSchemaOperationQId {
}

