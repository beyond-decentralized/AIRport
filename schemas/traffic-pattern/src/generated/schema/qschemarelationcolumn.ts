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
	SchemaColumnECascadeGraph,
	SchemaColumnEId,
	SchemaColumnEOptionalId,
	SchemaColumnEUpdateProperties,
	SchemaColumnESelect,
	QSchemaColumn,
	QSchemaColumnQId,
	QSchemaColumnQRelation,
} from './qschemacolumn';
import {
	SchemaRelationECascadeGraph,
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
export interface SchemaRelationColumnESelect
    extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	manyColumn?: SchemaColumnESelect;
	oneColumn?: SchemaColumnESelect;
	manyRelation?: SchemaRelationESelect;
	oneRelation?: SchemaRelationESelect;
	parentRelation?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationColumnEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationColumnEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationColumnEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	manyColumn?: SchemaColumnEOptionalId;
	oneColumn?: SchemaColumnEOptionalId;
	manyRelation?: SchemaRelationEOptionalId;
	oneRelation?: SchemaRelationEOptionalId;
	parentRelation?: SchemaRelationEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaRelationColumnECascadeGraph
	extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId, VersionedSchemaObjectECascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	manyColumn?: SchemaColumnESelect;
	oneColumn?: SchemaColumnESelect;
	manyRelation?: SchemaRelationESelect;
	oneRelation?: SchemaRelationESelect;
	parentRelation?: SchemaRelationESelect;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationColumnEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	MANY_SCHEMA_COLUMN_ID?: number | IQNumberField;
	ONE_SCHEMA_COLUMN_ID?: number | IQNumberField;
	MANY_SCHEMA_RELATION_ID?: number | IQNumberField;
	ONE_SCHEMA_RELATION_ID?: number | IQNumberField;
	PARENT_RELATION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaRelationColumnECreateProperties
extends Partial<SchemaRelationColumnEId>, SchemaRelationColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaRelationColumnECreateColumns
extends SchemaRelationColumnEId, SchemaRelationColumnEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaRelationColumn extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	manyColumn: QSchemaColumnQRelation;
	oneColumn: QSchemaColumnQRelation;
	manyRelation: QSchemaRelationQRelation;
	oneRelation: QSchemaRelationQRelation;
	parentRelation: QSchemaRelationQRelation;

}


// Entity Id Interface
export interface QSchemaRelationColumnQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaRelationColumnQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}

