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
	IActorApplication,
	ActorApplicationECascadeGraph,
	ActorApplicationEId,
	ActorApplicationEOptionalId,
	ActorApplicationEUpdateProperties,
	ActorApplicationESelect,
	QActorApplication,
	QActorApplicationQId,
	QActorApplicationQRelation,
} from './qactorapplication';
import {
	IRepositoryApplication,
	RepositoryApplicationECascadeGraph,
	RepositoryApplicationEId,
	RepositoryApplicationEOptionalId,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationESelect,
	QRepositoryApplication,
	QRepositoryApplicationQId,
	QRepositoryApplicationQRelation,
} from '../repository/qrepositoryapplication';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IApplication {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	host?: string;
	port?: number;

	// Non-Id Relations
	actorApplications?: IActorApplication[];
	repositoryApplications?: IRepositoryApplication[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect
    extends IEntitySelectProperties, ApplicationEOptionalId {
	// Non-Id Properties
	host?: string | IQStringField;
	port?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actorApplications?: ActorApplicationESelect;
	repositoryApplications?: RepositoryApplicationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	host?: string | IQStringField;
	port?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations
	actorApplications?: ActorApplicationECascadeGraph;
	repositoryApplications?: RepositoryApplicationECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	HOST?: string | IQStringField;
	PORT?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationECreateProperties
extends Partial<ApplicationEId>, ApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationECreateColumns
extends ApplicationEId, ApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplication extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	host: IQStringField;
	port: IQNumberField;

	// Non-Id Relations
	actorApplications: IQOneToManyRelation<QActorApplication>;
	repositoryApplications: IQOneToManyRelation<QRepositoryApplication>;

}


// Entity Id Interface
export interface QApplicationQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationQRelation
	extends IQRelation<QApplication>, QApplicationQId {
}

