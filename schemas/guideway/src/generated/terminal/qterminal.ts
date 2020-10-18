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
} from '../user/quser';
import {
	TerminalRepositoryGraph,
	TerminalRepositoryEId,
	TerminalRepositoryEOptionalId,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryESelect,
	QTerminalRepository,
	QTerminalRepositoryQId,
	QTerminalRepositoryQRelation,
} from './qterminalrepository';
import {
	AgtSharingMessageGraph,
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
	password?: string | IQStringField;
	lastPollConnectionDatetime?: number | IQNumberField;
	lastSseConnectionDatetime?: number | IQNumberField;

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
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	password?: string | IQStringField;
	lastPollConnectionDatetime?: number | IQNumberField;
	lastSseConnectionDatetime?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph
	extends IEntitySelectProperties, TerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	password?: string | IQStringField;
	lastPollConnectionDatetime?: number | IQNumberField;
	lastSseConnectionDatetime?: number | IQNumberField;

	// Relations
	user?: UserGraph;
	terminalRepositories?: TerminalRepositoryGraph[];
	sharingMessages?: AgtSharingMessageGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	SECOND_ID?: number | IQNumberField;
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
export interface QTerminal extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;
	secondId: IQNumberField;
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
	extends IQRelation<QTerminal>, QTerminalQId {
}

