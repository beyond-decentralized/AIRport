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
} from '../user/quser';
import {
	ITerminalRepository,
	TerminalRepositoryEId,
	TerminalRepositoryEOptionalId,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryESelect,
	QTerminalRepository,
	QTerminalRepositoryQId,
	QTerminalRepositoryQRelation,
} from './qterminalrepository';
import {
	IAgtSharingMessage,
	AgtSharingMessageEId,
	AgtSharingMessageEOptionalId,
	AgtSharingMessageEUpdateProperties,
	AgtSharingMessageESelect,
	QAgtSharingMessage,
	QAgtSharingMessageQId,
	QAgtSharingMessageQRelation,
} from '../synchronization/qagtsharingmessage';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminal {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	password?: string;
	lastPollConnectionDatetime?: number;
	lastSseConnectionDatetime?: number;

	// Non-Id Relations
	user?: IUser;
	terminalRepositories?: ITerminalRepository[];
	sharingMessages?: IAgtSharingMessage[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect
    extends IEntitySelectProperties, TerminalEOptionalId, TerminalEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;
	terminalRepositories?: TerminalRepositoryESelect;
	sharingMessages?: AgtSharingMessageESelect;

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
	password?: string | IQStringField;
	lastPollConnectionDatetime?: number | IQNumberField;
	lastSseConnectionDatetime?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PASSWORD?: string | IQStringField;
	LAST_RECENT_CONNECTION_DATETIME?: number | IQNumberField;
	LAST_ARCHIVE_CONNECTION_DATETIME?: number | IQNumberField;
	USER_ID?: number | IQNumberField;

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
export interface QTerminal extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	password: IQStringField;
	lastPollConnectionDatetime: IQNumberField;
	lastSseConnectionDatetime: IQNumberField;

	// Non-Id Relations
	user: QUserQRelation;
	terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
	sharingMessages: IQOneToManyRelation<QAgtSharingMessage>;

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
	extends QRelation<QTerminal>, QTerminalQId {
}

