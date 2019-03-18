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
	ITerminal,
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
	AgtEId,
	AgtEOptionalId,
	AgtEUpdateProperties,
	AgtESelect,
	QAgt,
	QAgtQId,
	QAgtQRelation,
} from './qagt';
import {
	IUserTerminalAgt,
	UserTerminalAgtEId,
	UserTerminalAgtEOptionalId,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtESelect,
	QUserTerminalAgt,
	QUserTerminalAgtQId,
	QUserTerminalAgtQRelation,
} from './quserterminalagt';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalAgt {
	
	// Id Properties

	// Id Relations
	terminal?: ITerminal;
	agt?: IAgt;

	// Non-Id Properties
	password?: string;

	// Non-Id Relations
	userTerminalAgts?: IUserTerminalAgt[];

	// Transient Properties

	// Public Methods
	
}		
		
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
export interface QTerminalAgt extends QEntity
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
	extends QRelation<QTerminalAgt>, QTerminalAgtQId {
}

