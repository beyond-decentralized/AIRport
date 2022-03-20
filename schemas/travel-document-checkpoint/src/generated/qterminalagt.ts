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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
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
	IUserTerminalAgt,
} from './userterminalagt';
import {
	ITerminalAgt,
} from './terminalagt';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalAgtESelect
    extends IEntitySelectProperties, TerminalAgtEOptionalId {
	// Non-Id Properties
	password?: string | IQStringField;

	// Id Relations - full property interfaces
	terminal?: TerminalESelect;
	agt?: AgtESelect;

  // Non-Id relations (including OneToMany's)
	userTerminalAgts?: UserTerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalAgtEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	terminal: TerminalEId;
	agt: AgtEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalAgtEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	terminal?: TerminalEOptionalId;
	agt?: AgtEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalAgtEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	password?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalAgtGraph
	extends TerminalAgtEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	password?: string | IQStringField;

	// Relations
	terminal?: TerminalGraph;
	agt?: AgtGraph;
	userTerminalAgts?: UserTerminalAgtGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalAgtEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PASSWORD?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalAgtECreateProperties
extends Partial<TerminalAgtEId>, TerminalAgtEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalAgtECreateColumns
extends TerminalAgtEId, TerminalAgtEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalAgt extends IQEntity
{
	// Id Fields

	// Id Relations
	terminal: QTerminalQRelation;
	agt: QAgtQRelation;

	// Non-Id Fields
	password: IQStringField;

	// Non-Id Relations
	userTerminalAgts: IQOneToManyRelation<QUserTerminalAgt>;

}


// Entity Id Interface
export interface QTerminalAgtQId
{
	
	// Id Fields

	// Id Relations
	terminal: QTerminalQId;
	agt: QAgtQId;


}

// Entity Relation Interface
export interface QTerminalAgtQRelation
	extends IQRelation<QTerminalAgt>, QTerminalAgtQId {
}

