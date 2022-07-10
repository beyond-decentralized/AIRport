import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	DatabaseGraph,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdateProperties,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
} from './qdatabase';
import {
	IDatabase,
} from './database';
import {
	TypeGraph,
	TypeEId,
	TypeEOptionalId,
	TypeEUpdateProperties,
	TypeESelect,
	QType,
	QTypeQId,
	QTypeQRelation,
} from '../type/qtype';
import {
	IType,
} from '../type/type';
import {
	IDatabaseType,
} from './databasetype';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseTypeESelect
    extends IEntitySelectProperties, DatabaseTypeEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	database?: DatabaseESelect;
	type?: TypeESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseTypeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	database: DatabaseEId;
	type: TypeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseTypeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	database?: DatabaseEOptionalId;
	type?: TypeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseTypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DatabaseTypeGraph
	extends DatabaseTypeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	database?: DatabaseGraph;
	type?: TypeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseTypeECreateProperties
extends Partial<DatabaseTypeEId>, DatabaseTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseTypeECreateColumns
extends DatabaseTypeEId, DatabaseTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QDatabaseType extends IQEntity
{
	// Id Fields

	// Id Relations
	database: QDatabaseQRelation;
	type: QTypeQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QDatabaseTypeQId
{
	
	// Id Fields

	// Id Relations
	database: QDatabaseQId;
	type: QTypeQId;


}

// Entity Relation Interface
export interface QDatabaseTypeQRelation
	extends IQRelation<QDatabaseType>, QDatabaseTypeQId {
}

