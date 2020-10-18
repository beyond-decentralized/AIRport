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
	TableConfiguration,
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
	SchemaOperationGraph,
	SchemaOperationEId,
	SchemaOperationEOptionalId,
	SchemaOperationEUpdateProperties,
	SchemaOperationESelect,
	QSchemaOperation,
	QSchemaOperationQId,
	QSchemaOperationQRelation,
} from './qschemaoperation';
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
import {
	SchemaRelationGraph,
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
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaEntityESelect
    extends VersionedSchemaObjectESelect, SchemaEntityEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	schemaVersion?: SchemaVersionESelect;
	columns?: SchemaColumnESelect;
	operations?: SchemaOperationESelect;
	properties?: SchemaPropertyESelect;
	relations?: SchemaRelationESelect;
	relationReferences?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEntityEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEntityEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEntityEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	schemaVersion?: SchemaVersionEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaEntityGraph
	extends SchemaEntityEOptionalId, VersionedSchemaObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Relations
	schemaVersion?: SchemaVersionGraph;
	columns?: SchemaColumnGraph[];
	operations?: SchemaOperationGraph[];
	properties?: SchemaPropertyGraph[];
	relations?: SchemaRelationGraph[];
	relationReferences?: SchemaRelationGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEntityEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	TABLE_INDEX?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
	NAME?: string | IQStringField;
	TABLE_CONFIGURATION?: string | IQStringField;
	SCHEMA_VERSION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaEntityECreateProperties
extends Partial<SchemaEntityEId>, SchemaEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaEntityECreateColumns
extends SchemaEntityEId, SchemaEntityEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaEntity extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	isLocal: IQBooleanField;
	isRepositoryEntity: IQBooleanField;
	name: IQStringField;
	tableConfig: IQStringField;

	// Non-Id Relations
	schemaVersion: QSchemaVersionQRelation;
	columns: IQOneToManyRelation<QSchemaColumn>;
	operations: IQOneToManyRelation<QSchemaOperation>;
	properties: IQOneToManyRelation<QSchemaProperty>;
	relations: IQOneToManyRelation<QSchemaRelation>;
	relationReferences: IQOneToManyRelation<QSchemaRelation>;

}


// Entity Id Interface
export interface QSchemaEntityQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaEntityQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaEntity>, QSchemaEntityQId {
}

