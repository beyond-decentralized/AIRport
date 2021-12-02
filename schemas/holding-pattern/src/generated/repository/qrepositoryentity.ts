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
	Repository,
} from '../../ddl/repository/Repository';
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
	Actor,
} from '../../ddl/infrastructure/Actor';
import {
	RepositoryEntity,
} from '../../ddl/repository/RepositoryEntity';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryEntityESelect
    extends IEntitySelectProperties, RepositoryEntityEOptionalId {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	systemWideOperationId?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	actor?: ActorESelect;
	originalActor?: ActorESelect;

  // Non-Id relations (including OneToMany's)
	originalRepository?: RepositoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEntityEId
    extends IEntityIdProperties {
	// Id Properties
	actorRecordId: number | IQNumberField;
	originalActorRecordId: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;
	actor: ActorEId;
	originalActor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEntityEOptionalId {
	// Id Properties
	actorRecordId?: number | IQNumberField;
	originalActorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;
	originalActor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEntityEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	systemWideOperationId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	originalRepository?: RepositoryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryEntityGraph
	extends RepositoryEntityEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	systemWideOperationId?: number | IQNumberField;

	// Relations
	repository?: RepositoryGraph;
	actor?: ActorGraph;
	originalActor?: ActorGraph;
	originalRepository?: RepositoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEntityEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryEntityECreateProperties
extends Partial<RepositoryEntityEId>, RepositoryEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryEntityECreateColumns
extends RepositoryEntityEId, RepositoryEntityEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryEntity<T> extends IQEntity<T>
{
	// Id Fields
	actorRecordId: IQNumberField;
	originalActorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;
	actor: QActorQRelation;
	originalActor: QActorQRelation;

	// Non-Id Fields
	ageSuitability: IQNumberField;
	systemWideOperationId: IQNumberField;

	// Non-Id Relations
	originalRepository: QRepositoryQRelation;

}


// Entity Id Interface
export interface QRepositoryEntityQId
{
	
	// Id Fields
	actorRecordId: IQNumberField;
	originalActorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;
	actor: QActorQId;
	originalActor: QActorQId;


}

// Entity Relation Interface
export interface QRepositoryEntityQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends IQRelation<SubType, SubQType>, QRepositoryEntityQId {
}

