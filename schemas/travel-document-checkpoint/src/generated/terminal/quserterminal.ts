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
} from '../quser';
import {
	IUser,
} from '../user';
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
	IUserTerminal,
} from './userterminal';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserTerminalESelect
    extends IEntitySelectProperties, UserTerminalEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	user?: UserESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserTerminalEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	user: UserEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	user?: UserEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserTerminalGraph
	extends UserTerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	user?: UserGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserTerminalECreateProperties
extends Partial<UserTerminalEId>, UserTerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserTerminalECreateColumns
extends UserTerminalEId, UserTerminalEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserTerminal extends IQEntity
{
	// Id Fields

	// Id Relations
	user: QUserQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QUserTerminalQId
{
	
	// Id Fields

	// Id Relations
	user: QUserQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QUserTerminalQRelation
	extends IQRelation<QUserTerminal>, QUserTerminalQId {
}

