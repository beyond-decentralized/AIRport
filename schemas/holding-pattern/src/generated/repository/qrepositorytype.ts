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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
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
	TypeGraph,
	TypeEId,
	TypeEOptionalId,
	TypeEUpdateProperties,
	TypeESelect,
	QType,
	QTypeQId,
	QTypeQRelation,
	IType,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryType,
} from './repositorytype';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTypeESelect
    extends IEntitySelectProperties, RepositoryTypeEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	type?: TypeESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTypeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	type: TypeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTypeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	type?: TypeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTypeGraph
	extends RepositoryTypeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	type?: TypeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTypeECreateProperties
extends Partial<RepositoryTypeEId>, RepositoryTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTypeECreateColumns
extends RepositoryTypeEId, RepositoryTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryType extends IQEntity
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	type: QTypeQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryTypeQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	type: QTypeQId;


}

// Entity Relation Interface
export interface QRepositoryTypeQRelation
	extends IQRelation<QRepositoryType>, QRepositoryTypeQId {
}

