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
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
	IUser,
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
	ITerminal,
	ClientGraph,
	ClientEId,
	ClientEOptionalId,
	ClientEUpdateProperties,
	ClientESelect,
	QClient,
	QClientQId,
	QClientQRelation,
	IClient,
} from '@airport/travel-document-checkpoint';
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
	IActor,
} from './actor';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect
    extends IEntitySelectProperties, ActorEOptionalId {
	// Non-Id Properties
	GUID?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;
	terminal?: TerminalESelect;
	application?: ApplicationESelect;
	client?: ClientESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId
    extends IEntityIdProperties {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	GUID?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;
	terminal?: TerminalEOptionalId;
	application?: ApplicationEOptionalId;
	client?: ClientEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorGraph
	extends ActorEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	GUID?: string | IQStringField;

	// Relations
	user?: UserGraph;
	terminal?: TerminalGraph;
	application?: ApplicationGraph;
	client?: ClientGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	GUID?: string | IQStringField;
	USER_ID?: number | IQNumberField;
	TERMINAL_ID?: number | IQNumberField;
	APPLICATION_INDEX?: number | IQNumberField;
	CLIENT_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorECreateProperties
extends Partial<ActorEId>, ActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorECreateColumns
extends ActorEId, ActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActor extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	GUID: IQStringField;

	// Non-Id Relations
	user: QUserQRelation;
	terminal: QTerminalQRelation;
	application: QApplicationQRelation;
	client: QClientQRelation;

}


// Entity Id Interface
export interface QActorQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QActorQRelation
	extends IQRelation<QActor>, QActorQId {
}

