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
	IUser,
	UserECascadeGraph,
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
	TerminalECascadeGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from './qterminal';
import {
	IAgt,
	AgtECascadeGraph,
	AgtEId,
	AgtEOptionalId,
	AgtEUpdateProperties,
	AgtESelect,
	QAgt,
	QAgtQId,
	QAgtQRelation,
} from './qagt';
import {
	ITerminalAgt,
	TerminalAgtECascadeGraph,
	TerminalAgtEId,
	TerminalAgtEOptionalId,
	TerminalAgtEUpdateProperties,
	TerminalAgtESelect,
	QTerminalAgt,
	QTerminalAgtQId,
	QTerminalAgtQRelation,
} from './qterminalagt';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserTerminalAgt {
	
	// Id Properties
	id: number;
	agtId: number;

	// Id Relations

	// Non-Id Properties
	password?: number;

	// Non-Id Relations
	user?: IUser;
	terminal?: ITerminal;
	agt?: IAgt;
	terminalAgt?: ITerminalAgt;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserTerminalAgtESelect
    extends IEntitySelectProperties, UserTerminalAgtEOptionalId {
	// Non-Id Properties
	password?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;
	terminal?: TerminalESelect;
	agt?: AgtESelect;
	terminalAgt?: TerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserTerminalAgtEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;
	agtId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalAgtEOptionalId {
	// Id Properties
	id?: number | IQNumberField;
	agtId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalAgtEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	password?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;
	terminal?: TerminalEOptionalId;
	agt?: AgtEOptionalId;
	terminalAgt?: TerminalAgtEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserTerminalAgtECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalAgtEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PASSWORD?: number | IQNumberField;
	USER_ID?: number | IQNumberField;
	TERMINAL_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserTerminalAgtECreateProperties
extends Partial<UserTerminalAgtEId>, UserTerminalAgtEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserTerminalAgtECreateColumns
extends UserTerminalAgtEId, UserTerminalAgtEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserTerminalAgt extends IQEntity
{
	// Id Fields
	id: IQNumberField;
	agtId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	password: IQNumberField;

	// Non-Id Relations
	user: QUserQRelation;
	terminal: QTerminalQRelation;
	agt: QAgtQRelation;
	terminalAgt: QTerminalAgtQRelation;

}


// Entity Id Interface
export interface QUserTerminalAgtQId
{
	
	// Id Fields
	id: IQNumberField;
	agtId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QUserTerminalAgtQRelation
	extends IQRelation<QUserTerminalAgt>, QUserTerminalAgtQId {
}

