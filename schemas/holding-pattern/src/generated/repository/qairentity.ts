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
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '../infrastructure/qactor';
import {
	IActor,
} from '../infrastructure/actor';
import {
	IAirEntity,
} from './airentity';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface AirEntityESelect
    extends IEntitySelectProperties, AirEntityEOptionalId {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	systemWideOperationId?: number | IQNumberField;
	originalActorRecordId?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)
	originalRepository?: RepositoryESelect;
	originalActor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AirEntityEId
    extends IEntityIdProperties {
	// Id Properties
	_actorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface AirEntityEOptionalId {
	// Id Properties
	_actorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AirEntityEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	systemWideOperationId?: number | IQNumberField;
	originalActorRecordId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	originalRepository?: RepositoryEOptionalId;
	originalActor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AirEntityGraph
	extends AirEntityEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	systemWideOperationId?: number | IQNumberField;
	originalActorRecordId?: number | IQNumberField;

	// Relations
	repository?: RepositoryGraph;
	actor?: ActorGraph;
	originalRepository?: RepositoryGraph;
	originalActor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AirEntityEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AirEntityECreateProperties
extends Partial<AirEntityEId>, AirEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AirEntityECreateColumns
extends AirEntityEId, AirEntityEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QAirEntity extends IQEntity
{
	// Id Fields
	_actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;
	actor: QActorQRelation;

	// Non-Id Fields
	ageSuitability: IQNumberField;
	createdAt: IQDateField;
	systemWideOperationId: IQNumberField;
	originalActorRecordId: IQNumberField;

	// Non-Id Relations
	originalRepository: QRepositoryQRelation;
	originalActor: QActorQRelation;

}


// Entity Id Interface
export interface QAirEntityQId
{
	
	// Id Fields
	_actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;
	actor: QActorQId;


}

// Entity Relation Interface
export interface QAirEntityQRelation<SubType, SubQType extends IQEntity>
	extends IQAirEntityRelation<SubType, SubQType>, QAirEntityQId {
}

