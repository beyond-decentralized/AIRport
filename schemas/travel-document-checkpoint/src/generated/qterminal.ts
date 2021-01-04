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
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';
import {
	User,
} from '../ddl/User';
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
	TerminalAgt,
} from '../ddl/TerminalAgt';
import {
	UserTerminalGraph,
	UserTerminalEId,
	UserTerminalEOptionalId,
	UserTerminalEUpdateProperties,
	UserTerminalESelect,
	QUserTerminal,
	QUserTerminalQId,
	QUserTerminalQRelation,
} from './quserterminal';
import {
	UserTerminal,
} from '../ddl/UserTerminal';
import {
	UserTerminalAgtGraph,
	UserTerminalAgtEId,
	UserTerminalAgtEOptionalId,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtESelect,
	QUserTerminalAgt,
	QUserTerminalAgtQId,
	QUserTerminalAgtQRelation,
} from './quserterminalagt';
import {
	UserTerminalAgt,
} from '../ddl/UserTerminalAgt';
import {
	Terminal,
} from '../ddl/Terminal';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect
    extends IEntitySelectProperties, TerminalEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserESelect;
	terminalAgts?: TerminalAgtESelect;
	userTerminal?: UserTerminalESelect;
	userTerminalAgt?: UserTerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	owner?: UserEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph
	extends TerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;

	// Relations
	owner?: UserGraph;
	terminalAgts?: TerminalAgtGraph[];
	userTerminal?: UserTerminalGraph[];
	userTerminalAgt?: UserTerminalAgtGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	SECOND_ID?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	OWNER_USER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties
extends Partial<TerminalEId>, TerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns
extends TerminalEId, TerminalEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminal extends IQEntity<Terminal>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;
	secondId: IQNumberField;
	isLocal: IQBooleanField;

	// Non-Id Relations
	owner: QUserQRelation;
	terminalAgts: IQOneToManyRelation<TerminalAgt, QTerminalAgt>;
	userTerminal: IQOneToManyRelation<UserTerminal, QUserTerminal>;
	userTerminalAgt: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;

}


// Entity Id Interface
export interface QTerminalQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTerminalQRelation
	extends IQRelation<Terminal, QTerminal>, QTerminalQId {
}

