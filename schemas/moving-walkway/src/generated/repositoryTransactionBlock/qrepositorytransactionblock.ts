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
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '@airport/holding-pattern';
import {
	ISharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockEOptionalId,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockESelect,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockQId,
	QSharingNodeRepoTransBlockQRelation,
} from '../sharingNode/qsharingnoderepotransblock';
import {
	ISharingMessageRepoTransBlock,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockEOptionalId,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockESelect,
	QSharingMessageRepoTransBlock,
	QSharingMessageRepoTransBlockQId,
	QSharingMessageRepoTransBlockQRelation,
} from '../sharingMessage/qsharingmessagerepotransblock';
import {
	IMissingRecordRepoTransBlock,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockEOptionalId,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockESelect,
	QMissingRecordRepoTransBlock,
	QMissingRecordRepoTransBlockQId,
	QMissingRecordRepoTransBlockQRelation,
} from '../missingRecord/qmissingrecordrepotransblock';
import {
	IRepoTransBlockSchemasToChange,
	RepoTransBlockSchemasToChangeEId,
	RepoTransBlockSchemasToChangeEOptionalId,
	RepoTransBlockSchemasToChangeEUpdateProperties,
	RepoTransBlockSchemasToChangeESelect,
	QRepoTransBlockSchemasToChange,
	QRepoTransBlockSchemasToChangeQId,
	QRepoTransBlockSchemasToChangeQRelation,
} from './qrepotransblockschematochange';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTransactionBlock {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	sourceId?: number;
	hash?: string;
	syncOutcomeType?: number;
	contents?: string;

	// Non-Id Relations
	source?: ITerminal;
	repository?: IRepository;
	repositoryTransactionHistory?: IRepositoryTransactionHistory;
	sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
	sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
	missingRecordRepoTransBlocks?: IMissingRecordRepoTransBlock[];
	repoTransBlockSchemasToChange?: IRepoTransBlockSchemasToChange[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionBlockESelect
    extends IEntitySelectProperties, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	source?: TerminalESelect;
	repository?: RepositoryESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;
	missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockESelect;
	repoTransBlockSchemasToChange?: RepoTransBlockSchemasToChangeESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionBlockEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionBlockEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	sourceId?: number | IQNumberField;
	hash?: string | IQStringField;
	syncOutcomeType?: number | IQNumberField;
	contents?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	source?: TerminalEOptionalId;
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SOURCE_ID?: number | IQNumberField;
	HASH?: string | IQStringField;
	SYNC_OUTCOME_TYPE?: number | IQNumberField;
	CONTENTS?: string | IQStringField;
	SOURCE_TERMINAL_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionBlockECreateProperties
extends RepositoryTransactionBlockEId, RepositoryTransactionBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionBlockECreateColumns
extends RepositoryTransactionBlockEId, RepositoryTransactionBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionBlock extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	sourceId: IQNumberField;
	hash: IQStringField;
	syncOutcomeType: IQNumberField;
	contents: IQStringField;

	// Non-Id Relations
	source: QTerminalQRelation;
	repository: QRepositoryQRelation;
	repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
	sharingNodeRepoTransBlocks: IQOneToManyRelation<QSharingNodeRepoTransBlock>;
	sharingMessageRepoTransBlocks: IQOneToManyRelation<QSharingMessageRepoTransBlock>;
	missingRecordRepoTransBlocks: IQOneToManyRelation<QMissingRecordRepoTransBlock>;
	repoTransBlockSchemasToChange: IQOneToManyRelation<QRepoTransBlockSchemasToChange>;

}


// Entity Id Interface
export interface QRepositoryTransactionBlockQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryTransactionBlockQRelation
	extends QRelation<QRepositoryTransactionBlock>, QRepositoryTransactionBlockQId {
}

