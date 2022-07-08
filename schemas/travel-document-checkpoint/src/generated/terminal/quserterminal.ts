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
} from '../quserAccount';
import {
	IUserAccount,
} from '../userAccount';
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
	IUserAccountTerminal,
} from './userAccountterminal';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserAccountTerminalESelect
    extends IEntitySelectProperties, UserAccountTerminalEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	userAccount?: UserAccountESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserAccountTerminalEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	userAccount: UserAccountEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserAccountTerminalEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	userAccount?: UserAccountEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserAccountTerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserAccountTerminalGraph
	extends UserAccountTerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	userAccount?: UserAccountGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserAccountTerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserAccountTerminalECreateProperties
extends Partial<UserAccountTerminalEId>, UserAccountTerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserAccountTerminalECreateColumns
extends UserAccountTerminalEId, UserAccountTerminalEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserAccountTerminal extends IQEntity
{
	// Id Fields

	// Id Relations
	userAccount: QUserAccountQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QUserAccountTerminalQId
{
	
	// Id Fields

	// Id Relations
	userAccount: QUserAccountQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QUserAccountTerminalQRelation
	extends IQRelation<QUserAccountTerminal>, QUserAccountTerminalQId {
}

