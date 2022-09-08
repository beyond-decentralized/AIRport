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
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qRepository';
import {
	IRepository,
} from './Repository';
import {
	DatabaseGraph,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdateProperties,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
	IDatabase,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryDatabase,
} from './RepositoryDatabase';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryDatabaseESelect
    extends IEntitySelectProperties, RepositoryDatabaseEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	database?: DatabaseESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryDatabaseEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	database: DatabaseEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryDatabaseEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	database?: DatabaseEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryDatabaseEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryDatabaseGraph
	extends RepositoryDatabaseEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	database?: DatabaseGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryDatabaseEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryDatabaseECreateProperties
extends Partial<RepositoryDatabaseEId>, RepositoryDatabaseEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryDatabaseECreateColumns
extends RepositoryDatabaseEId, RepositoryDatabaseEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryDatabase<IQE extends QRepositoryDatabase = any> extends IQEntity<IQE | QRepositoryDatabase>
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	database: QDatabaseQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QRepositoryDatabaseQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	database: QDatabaseQId;


}

// Entity Relation Interface
export interface QRepositoryDatabaseQRelation
	extends IQRelation<QRepositoryDatabase>, QRepositoryDatabaseQId {
}