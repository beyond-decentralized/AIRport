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
	SynchronizationConflictGraph,
	SynchronizationConflictEId,
	SynchronizationConflictEOptionalId,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictESelect,
	QSynchronizationConflict,
	QSynchronizationConflictQId,
	QSynchronizationConflictQRelation,
} from './qsynchronizationconflict';
import {
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '@airport/holding-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationESelect
    extends IEntitySelectProperties, SynchronizationConflictPendingNotificationEOptionalId {
	// Non-Id Properties
	acknowledged?: boolean | IQBooleanField;

	// Id Relations - full property interfaces
	synchronizationConflict?: SynchronizationConflictESelect;
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictPendingNotificationEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	synchronizationConflict: SynchronizationConflictEId;
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictPendingNotificationEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	synchronizationConflict?: SynchronizationConflictEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	acknowledged?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictPendingNotificationGraph
	extends SynchronizationConflictPendingNotificationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	acknowledged?: boolean | IQBooleanField;

	// Relations
	synchronizationConflict?: SynchronizationConflictGraph;
	actor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictPendingNotificationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACKNOWLEDGED?: boolean | IQBooleanField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationECreateProperties
extends Partial<SynchronizationConflictPendingNotificationEId>, SynchronizationConflictPendingNotificationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictPendingNotificationECreateColumns
extends SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSynchronizationConflictPendingNotification extends IQEntity
{
	// Id Fields

	// Id Relations
	synchronizationConflict: QSynchronizationConflictQRelation;
	actor: QActorQRelation;

	// Non-Id Fields
	acknowledged: IQBooleanField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSynchronizationConflictPendingNotificationQId
{
	
	// Id Fields

	// Id Relations
	synchronizationConflict: QSynchronizationConflictQId;
	actor: QActorQId;


}

// Entity Relation Interface
export interface QSynchronizationConflictPendingNotificationQRelation
	extends IQRelation<QSynchronizationConflictPendingNotification>, QSynchronizationConflictPendingNotificationQId {
}

