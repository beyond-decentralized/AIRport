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
	IVersionedSchemaObject,
	VersionedSchemaObjectEId,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectESelect,
	QVersionedSchemaObjectQId,
	QVersionedSchemaObjectQRelation,
	QVersionedSchemaObject,
} from './qversionedschemaobject';
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

export interface ISchemaRelationColumn extends IVersionedSchemaObject {
	
	// Id Properties

	// Id Relations
	manyColumn?: ISchemaColumn;
	oneColumn?: ISchemaColumn;
	manyRelation?: ISchemaRelation;
	oneRelation?: ISchemaRelation;

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
export interface SchemaRelationColumnESelect
    extends VersionedSchemaObjectESelect, SchemaRelationColumnEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	manyColumn?: SchemaColumnESelect;
	oneColumn?: SchemaColumnESelect;
	manyRelation?: SchemaRelationESelect;
	oneRelation?: SchemaRelationESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationColumnEId
    extends VersionedSchemaObjectEId {
	// Id Properties

	// Id Relations - Ids only
	manyColumn: SchemaColumnEId;
	oneColumn: SchemaColumnEId;
	manyRelation: SchemaRelationEId;
	oneRelation: SchemaRelationEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationColumnEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	manyColumn?: SchemaColumnEOptionalId;
	oneColumn?: SchemaColumnEOptionalId;
	manyRelation?: SchemaRelationEOptionalId;
	oneRelation?: SchemaRelationEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationColumnEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

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

	// Id Relations
	manyColumn: QSchemaColumnQRelation;
	oneColumn: QSchemaColumnQRelation;
	manyRelation: QSchemaRelationQRelation;
	oneRelation: QSchemaRelationQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSchemaRelationColumnQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields

	// Id Relations
	manyColumn: QSchemaColumnQId;
	oneColumn: QSchemaColumnQId;
	manyRelation: QSchemaRelationQId;
	oneRelation: QSchemaRelationQId;


}

// Entity Relation Interface
export interface QSchemaRelationColumnQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}

