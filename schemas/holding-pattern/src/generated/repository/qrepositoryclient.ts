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
} from './qrepository';
import {
	IRepository,
} from './repository';
import {
	ClientGraph,
	ClientEId,
	ClientEOptionalId,
	ClientEUpdateProperties,
	ClientESelect,
	QClient,
	QClientQId,
	QClientQRelation,
	IClient,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryClient,
} from './repositoryclient';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryClientESelect
    extends IEntitySelectProperties, RepositoryClientEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	client?: ClientESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryClientEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	client: ClientEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryClientEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	client?: ClientEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryClientEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryClientGraph
	extends RepositoryClientEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	client?: ClientGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryClientEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryClientECreateProperties
extends Partial<RepositoryClientEId>, RepositoryClientEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryClientECreateColumns
extends RepositoryClientEId, RepositoryClientEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryClient<IQE extends QRepositoryClient = any> extends IQEntity<IQE | QRepositoryClient>
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	client: QClientQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QRepositoryClientQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	client: QClientQId;


}

// Entity Relation Interface
export interface QRepositoryClientQRelation
	extends IQRelation<QRepositoryClient>, QRepositoryClientQId {
}