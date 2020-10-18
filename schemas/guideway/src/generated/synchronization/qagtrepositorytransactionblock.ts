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
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	TerminalRepositoryGraph,
	TerminalRepositoryEId,
	TerminalRepositoryEOptionalId,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryESelect,
	QTerminalRepository,
	QTerminalRepositoryQId,
	QTerminalRepositoryQRelation,
} from '../terminal/qterminalrepository';
import {
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from '../terminal/qterminal';
import {
	ServerGraph,
	ServerEId,
	ServerEOptionalId,
	ServerEUpdateProperties,
	ServerESelect,
	QServer,
	QServerQId,
	QServerQRelation,
} from '../server/qserver';
import {
	SyncLogGraph,
	SyncLogEId,
	SyncLogEOptionalId,
	SyncLogEUpdateProperties,
	SyncLogESelect,
	QSyncLog,
	QSyncLogQId,
	QSyncLogQRelation,
} from './qsynclog';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockESelect
    extends IEntitySelectProperties, AgtRepositoryTransactionBlockEOptionalId {
	// Non-Id Properties
	archivingStatus?: number | IQNumberField;
	addDatetime?: number | IQNumberField;
	tmRepositoryTransactionBlockId?: number | IQNumberField;
	contents?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryESelect;
	terminalRepositories?: TerminalRepositoryESelect;
	terminal?: TerminalESelect;
	archivingServer?: ServerESelect;
	syncLogs?: SyncLogESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtRepositoryTransactionBlockEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface AgtRepositoryTransactionBlockEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	archivingStatus?: number | IQNumberField;
	addDatetime?: number | IQNumberField;
	tmRepositoryTransactionBlockId?: number | IQNumberField;
	contents?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	repository?: RepositoryEOptionalId;
	terminal?: TerminalEOptionalId;
	archivingServer?: ServerEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgtRepositoryTransactionBlockGraph
	extends IEntitySelectProperties, AgtRepositoryTransactionBlockEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	archivingStatus?: number | IQNumberField;
	addDatetime?: number | IQNumberField;
	tmRepositoryTransactionBlockId?: number | IQNumberField;
	contents?: string | IQStringField;

	// Relations
	repository?: RepositoryGraph;
	terminalRepositories?: TerminalRepositoryGraph[];
	terminal?: TerminalGraph;
	archivingServer?: ServerGraph;
	syncLogs?: SyncLogGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtRepositoryTransactionBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ARCHIVING_STATUS?: number | IQNumberField;
	ADD_DATETIME?: number | IQNumberField;
	TM_REPOSITORY_TRANSACTION_BLOCK_ID?: number | IQNumberField;
	REPOSITORY_TRANSACTION_BLOCK?: string | IQStringField;
	REPOSITORY_ID?: number | IQNumberField;
	TERMINAL_ID?: number | IQNumberField;
	ARCHIVING_SERVER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtRepositoryTransactionBlockECreateProperties
extends Partial<AgtRepositoryTransactionBlockEId>, AgtRepositoryTransactionBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtRepositoryTransactionBlockECreateColumns
extends AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgtRepositoryTransactionBlock extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	archivingStatus: IQNumberField;
	addDatetime: IQNumberField;
	tmRepositoryTransactionBlockId: IQNumberField;
	contents: IQStringField;

	// Non-Id Relations
	repository: QRepositoryQRelation;
	terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
	terminal: QTerminalQRelation;
	archivingServer: QServerQRelation;
	syncLogs: IQOneToManyRelation<QSyncLog>;

}


// Entity Id Interface
export interface QAgtRepositoryTransactionBlockQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QAgtRepositoryTransactionBlockQRelation
	extends IQRelation<QAgtRepositoryTransactionBlock>, QAgtRepositoryTransactionBlockQId {
}

