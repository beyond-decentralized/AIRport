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
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
import {
	IActor,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '../infrastructure/qactor';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IAbstractRepositoryEntity {
	
	// Id Properties
	actorRecordId?: number;

	// Id Relations
	repository?: IRepository;
	actor?: IActor;

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
export interface AbstractRepositoryEntityESelect
    extends IEntitySelectProperties, AbstractRepositoryEntityEOptionalId, AbstractRepositoryEntityEUpdateProperties {
	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AbstractRepositoryEntityEId
    extends IEntityIdProperties {
	// Id Properties
	actorRecordId: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface AbstractRepositoryEntityEOptionalId {
	// Id Properties
	actorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AbstractRepositoryEntityEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AbstractRepositoryEntityEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AbstractRepositoryEntityECreateProperties
extends AbstractRepositoryEntityEId, AbstractRepositoryEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AbstractRepositoryEntityECreateColumns
extends AbstractRepositoryEntityEId, AbstractRepositoryEntityEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAbstractRepositoryEntity extends QEntity
{
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;
	actor: QActorQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QAbstractRepositoryEntityQId
{
	
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;
	actor: QActorQId;


}

// Entity Relation Interface
export interface QAbstractRepositoryEntityQRelation<SubType extends IQEntityInternal>
	extends QRelation<SubType>, QAbstractRepositoryEntityQId {
}

