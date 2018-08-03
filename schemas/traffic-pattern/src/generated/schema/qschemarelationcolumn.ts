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

export interface ISchemaRelationColumn {
	
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
    extends IEntitySelectProperties, SchemaRelationColumnEOptionalId, SchemaRelationColumnEUpdateProperties {
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
    extends IEntityIdProperties {
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
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationColumnEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

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
export interface QSchemaRelationColumn extends QEntity
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
export interface QSchemaRelationColumnQId
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
	extends QRelation<QSchemaRelationColumn>, QSchemaRelationColumnQId {
}

