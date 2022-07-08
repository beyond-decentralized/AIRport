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
	UserAccountGraph,
	UserAccountEId,
	UserAccountEOptionalId,
	UserAccountEUpdateProperties,
	UserAccountESelect,
	QUserAccount,
	QUserAccountQId,
	QUserAccountQRelation,
} from './quserAccount';
import {
	IUserAccount,
} from './userAccount';
import {
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from './qterminal';
import {
	ITerminal,
} from './terminal';
import {
	AgtGraph,
	AgtEId,
	AgtEOptionalId,
	AgtEUpdateProperties,
	AgtESelect,
	QAgt,
	QAgtQId,
	QAgtQRelation,
} from './qagt';
import {
	IAgt,
} from './agt';
import {
	TerminalAgtGraph,
	TerminalAgtEId,
	TerminalAgtEOptionalId,
	TerminalAgtEUpdateProperties,
	TerminalAgtESelect,
	QTerminalAgt,
	QTerminalAgtQId,
	QTerminalAgtQRelation,
} from './qterminalagt';
import {
	ITerminalAgt,
} from './terminalagt';
import {
	IUserAccountTerminalAgt,
} from './userAccountterminalagt';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserAccountTerminalAgtESelect
    extends IEntitySelectProperties, UserAccountTerminalAgtEOptionalId {
	// Non-Id Properties
	password?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	userAccount?: UserAccountESelect;
	terminal?: TerminalESelect;
	agt?: AgtESelect;
	terminalAgt?: TerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserAccountTerminalAgtEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;
	agtId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserAccountTerminalAgtEOptionalId {
	// Id Properties
	id?: number | IQNumberField;
	agtId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserAccountTerminalAgtEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	password?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	userAccount?: UserAccountEOptionalId;
	terminal?: TerminalEOptionalId;
	agt?: AgtEOptionalId;
	terminalAgt?: TerminalAgtEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserAccountTerminalAgtGraph
	extends UserAccountTerminalAgtEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	password?: number | IQNumberField;

	// Relations
	userAccount?: UserAccountGraph;
	terminal?: TerminalGraph;
	agt?: AgtGraph;
	terminalAgt?: TerminalAgtGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserAccountTerminalAgtEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PASSWORD?: number | IQNumberField;
	USER_ACCOUNT_ID?: number | IQNumberField;
	TERMINAL_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserAccountTerminalAgtECreateProperties
extends Partial<UserAccountTerminalAgtEId>, UserAccountTerminalAgtEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserAccountTerminalAgtECreateColumns
extends UserAccountTerminalAgtEId, UserAccountTerminalAgtEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserAccountTerminalAgt extends IQEntity
{
	// Id Fields
	id: IQNumberField;
	agtId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	password: IQNumberField;

	// Non-Id Relations
	userAccount: QUserAccountQRelation;
	terminal: QTerminalQRelation;
	agt: QAgtQRelation;
	terminalAgt: QTerminalAgtQRelation;

}


// Entity Id Interface
export interface QUserAccountTerminalAgtQId
{
	
	// Id Fields
	id: IQNumberField;
	agtId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QUserAccountTerminalAgtQRelation
	extends IQRelation<QUserAccountTerminalAgt>, QUserAccountTerminalAgtQId {
}

