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
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
	IApplication,
} from '@airport/airspace';
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


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryApplicationESelect
    extends IEntitySelectProperties, RepositoryApplicationEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	application?: ApplicationESelect;
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryApplicationEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	application: ApplicationEId;
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryApplicationEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	application?: ApplicationEOptionalId;
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryApplicationGraph
	extends RepositoryApplicationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	application?: ApplicationGraph;
	repository?: RepositoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryApplication<IQE extends QRepositoryApplication = any> extends IQEntity<IQE | QRepositoryApplication>
{
	// Id Fields

	// Id Relations
	application: QApplicationQRelation;
	repository: QRepositoryQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QRepositoryApplicationQId
{
	
	// Id Fields

	// Id Relations
	application: QApplicationQId;
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QRepositoryApplicationQRelation
	extends IQRelation<QRepositoryApplication>, QRepositoryApplicationQId {
}