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
} from './qactor';
import {
	Actor,
} from '../../ddl/infrastructure/Actor';
import {
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './qapplication';
import {
	Application,
} from '../../ddl/infrastructure/Application';
import {
	ActorApplication,
} from '../../ddl/infrastructure/ActorApplication';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorApplicationESelect
    extends IEntitySelectProperties, ActorApplicationEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)
	application?: ApplicationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ActorApplicationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	application?: ApplicationEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorApplicationGraph
	extends ActorApplicationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	actor?: ActorGraph;
	application?: ApplicationGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	APPLICATION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorApplicationECreateProperties
extends Partial<ActorApplicationEId>, ActorApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorApplicationECreateColumns
extends ActorApplicationEId, ActorApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActorApplication extends IQEntity<ActorApplication>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	actor: QActorQRelation;

	// Non-Id Fields

	// Non-Id Relations
	application: QApplicationQRelation;

}


// Entity Id Interface
export interface QActorApplicationQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	actor: QActorQId;


}

// Entity Relation Interface
export interface QActorApplicationQRelation
	extends IQRelation<ActorApplication, QActorApplication>, QActorApplicationQId {
}

