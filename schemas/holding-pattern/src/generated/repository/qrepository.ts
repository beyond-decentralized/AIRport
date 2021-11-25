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
	RepositoryActorGraph,
	RepositoryActorEId,
	RepositoryActorEOptionalId,
	RepositoryActorEUpdateProperties,
	RepositoryActorESelect,
	QRepositoryActor,
	QRepositoryActorQId,
	QRepositoryActorQRelation,
} from './qrepositoryactor';
import {
	RepositoryActor,
} from '../../ddl/repository/RepositoryActor';
import {
	RepositoryTransactionHistoryGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '../history/qrepositorytransactionhistory';
import {
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';
import {
	Repository,
} from '../../ddl/repository/Repository';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends IEntitySelectProperties, RepositoryEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;
	uuId?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	source?: string | IQStringField;
	immutable?: boolean | IQBooleanField;
	syncPriority?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	ownerActor?: ActorESelect;
	repositoryActors?: RepositoryActorESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;
	uuId?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	source?: string | IQStringField;
	immutable?: boolean | IQBooleanField;
	syncPriority?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	ownerActor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph
	extends RepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	createdAt?: Date | IQDateField;
	uuId?: string | IQStringField;
	ageSuitability?: number | IQNumberField;
	source?: string | IQStringField;
	immutable?: boolean | IQBooleanField;
	syncPriority?: string | IQStringField;

	// Relations
	ownerActor?: ActorGraph;
	repositoryActors?: RepositoryActorGraph[];
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	CREATED_AT?: Date | IQDateField;
	UU_ID?: string | IQStringField;
	AGE_SUITABILITY?: number | IQNumberField;
	SOURCE?: string | IQStringField;
	IMMUTABLE?: boolean | IQBooleanField;
	SYNC_PRIORITY?: string | IQStringField;
	OWNER_ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties
extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns
extends RepositoryEId, RepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity<Repository>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;
	uuId: IQStringField;
	ageSuitability: IQNumberField;
	source: IQStringField;
	immutable: IQBooleanField;
	syncPriority: IQStringField;

	// Non-Id Relations
	ownerActor: QActorQRelation;
	repositoryActors: IQOneToManyRelation<RepositoryActor, QRepositoryActor>;
	repositoryTransactionHistory: IQOneToManyRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>;

}


// Entity Id Interface
export interface QRepositoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends IQRelation<Repository, QRepository>, QRepositoryQId {
}

