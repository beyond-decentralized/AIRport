import {
	IQEntityInternal,
	IEntityIdProperties,
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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';
import {
	ITerminal,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from './qterminal';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserTerminal {
	
	// Id Properties

	// Id Relations
	user?: IUser;
	terminal?: ITerminal;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
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

	// Non-Id Relations - ids only & no OneToMany's

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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserTerminal extends QEntity
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
	extends QRelation<QUserTerminal>, QUserTerminalQId {
}

