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
	StageableECascadeGraph,
	StageableEId,
	StageableEUpdateColumns,
	StageableEUpdateProperties,
	StageableESelect,
	QStageableQId,
	QStageableQRelation,
	QStageable,
} from '../infrastructure/qstageable';
import {
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
import {
	ActorECascadeGraph,
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
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryEntityESelect
    extends StageableESelect, RepositoryEntityEOptionalId {
	// Non-Id Properties
	systemWideOperationId?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEntityEId
    extends StageableEId {
	// Id Properties
	actorRecordId: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEntityEOptionalId {
	// Id Properties
	actorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEntityEUpdateProperties
	extends StageableEUpdateProperties {
	// Non-Id Properties
	systemWideOperationId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryEntityECascadeGraph
	extends StageableECascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEntityEUpdateColumns
	extends StageableEUpdateColumns {
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
export interface QRepositoryEntity extends QStageable
{
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;
	actor: QActorQRelation;

	// Non-Id Fields
	systemWideOperationId: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryEntityQId extends QStageableQId
{
	
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;
	actor: QActorQId;


}

// Entity Relation Interface
export interface QRepositoryEntityQRelation<SubType extends IQEntity>
	extends QStageableQRelation<QRepositoryEntity>, QRepositoryEntityQId {
}

