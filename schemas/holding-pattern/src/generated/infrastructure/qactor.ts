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
	UserAccountGraph,
	UserAccountEId,
	UserAccountEOptionalId,
	UserAccountEUpdateProperties,
	UserAccountESelect,
	QUserAccount,
	QUserAccountQId,
	QUserAccountQRelation,
	IUserAccount,
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
	ITerminal,
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
	userAccount?: UserAccountESelect;
	terminal?: TerminalESelect;
	application?: ApplicationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId
    extends IEntityIdProperties {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	GUID?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	userAccount?: UserAccountEOptionalId;
	terminal?: TerminalEOptionalId;
	application?: ApplicationEOptionalId;

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
	userAccount?: UserAccountGraph;
	terminal?: TerminalGraph;
	application?: ApplicationGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	GUID?: string | IQStringField;
	USER_ACCOUNT_LID?: number | IQNumberField;
	TERMINAL_LID?: number | IQNumberField;
	APPLICATION_INDEX?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QActor<IQE extends QActor = any> extends IQEntity<IQE | QActor>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	GUID: IQStringField;

	// Non-Id Relations
	userAccount: QUserAccountQRelation;
	terminal: QTerminalQRelation;
	application: QApplicationQRelation;

}

// Entity Id Interface
export interface QActorQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QActorQRelation
	extends IQRelation<QActor>, QActorQId {
}