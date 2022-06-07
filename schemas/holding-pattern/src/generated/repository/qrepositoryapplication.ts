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
	IRepositoryApplication,
} from './repositoryapplication';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryApplicationESelect
    extends IEntitySelectProperties, RepositoryApplicationEOptionalId {
	// Non-Id Properties
	applicationIndex?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryApplicationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	applicationIndex?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryApplicationGraph
	extends RepositoryApplicationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	applicationIndex?: number | IQNumberField;

	// Relations
	repository?: RepositoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	APPLICATION_INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryApplicationECreateProperties
extends Partial<RepositoryApplicationEId>, RepositoryApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryApplicationECreateColumns
extends RepositoryApplicationEId, RepositoryApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryApplication extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;

	// Non-Id Fields
	applicationIndex: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryApplicationQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QRepositoryApplicationQRelation
	extends IQRelation<QRepositoryApplication>, QRepositoryApplicationQId {
}

