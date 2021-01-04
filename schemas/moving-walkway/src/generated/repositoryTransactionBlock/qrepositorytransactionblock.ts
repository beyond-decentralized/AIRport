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
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
	Terminal,
} from '@airport/travel-document-checkpoint';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	Repository,
	RepositoryTransactionHistoryGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
	RepositoryTransactionHistory,
} from '@airport/holding-pattern';
import {
	SharingNodeRepoTransBlockGraph,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockEOptionalId,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockESelect,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockQId,
	QSharingNodeRepoTransBlockQRelation,
} from '../sharingNode/qsharingnoderepotransblock';
import {
	SharingNodeRepoTransBlock,
} from '../../ddl/sharingNode/SharingNodeRepoTransBlock';
import {
	SharingMessageRepoTransBlockGraph,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockEOptionalId,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockESelect,
	QSharingMessageRepoTransBlock,
	QSharingMessageRepoTransBlockQId,
	QSharingMessageRepoTransBlockQRelation,
} from '../sharingMessage/qsharingmessagerepotransblock';
import {
	SharingMessageRepoTransBlock,
} from '../../ddl/sharingMessage/SharingMessageRepoTransBlock';
import {
	MissingRecordRepoTransBlockGraph,
	MissingRecordRepoTransBlockEId,
	MissingRecordRepoTransBlockEOptionalId,
	MissingRecordRepoTransBlockEUpdateProperties,
	MissingRecordRepoTransBlockESelect,
	QMissingRecordRepoTransBlock,
	QMissingRecordRepoTransBlockQId,
	QMissingRecordRepoTransBlockQRelation,
} from '../missingRecord/qmissingrecordrepotransblock';
import {
	MissingRecordRepoTransBlock,
} from '../../ddl/missingRecord/MissingRecordRepoTransBlock';
import {
	RepoTransBlockSchemaToChangeGraph,
	RepoTransBlockSchemaToChangeEId,
	RepoTransBlockSchemaToChangeEOptionalId,
	RepoTransBlockSchemaToChangeEUpdateProperties,
	RepoTransBlockSchemaToChangeESelect,
	QRepoTransBlockSchemaToChange,
	QRepoTransBlockSchemaToChangeQId,
	QRepoTransBlockSchemaToChangeQRelation,
} from './qrepotransblockschematochange';
import {
	RepoTransBlockSchemaToChange,
} from '../../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange';
import {
	RepositoryTransactionBlock,
} from '../../ddl/repositoryTransactionBlock/RepositoryTransactionBlock';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionBlockESelect
    extends IEntitySelectProperties, RepositoryTransactionBlockEOptionalId {
	// Non-Id Properties
	sourceId?: number | IQNumberField;
	hash?: string | IQStringField;
	syncOutcomeType?: number | IQNumberField;
	contents?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	source?: TerminalESelect;
	repository?: RepositoryESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;
	missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockESelect;
	repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeESelect;

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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionBlockGraph
	extends RepositoryTransactionBlockEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	sourceId?: number | IQNumberField;
	hash?: string | IQStringField;
	syncOutcomeType?: number | IQNumberField;
	contents?: string | IQStringField;

	// Relations
	source?: TerminalGraph;
	repository?: RepositoryGraph;
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockGraph[];
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockGraph[];
	missingRecordRepoTransBlocks?: MissingRecordRepoTransBlockGraph[];
	repoTransBlockSchemasToChange?: RepoTransBlockSchemaToChangeGraph[];

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
extends Partial<RepositoryTransactionBlockEId>, RepositoryTransactionBlockEUpdateProperties {
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
export interface QRepositoryTransactionBlock extends IQEntity<RepositoryTransactionBlock>
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
	repositoryTransactionHistory: IQOneToManyRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>;
	sharingNodeRepoTransBlocks: IQOneToManyRelation<SharingNodeRepoTransBlock, QSharingNodeRepoTransBlock>;
	sharingMessageRepoTransBlocks: IQOneToManyRelation<SharingMessageRepoTransBlock, QSharingMessageRepoTransBlock>;
	missingRecordRepoTransBlocks: IQOneToManyRelation<MissingRecordRepoTransBlock, QMissingRecordRepoTransBlock>;
	repoTransBlockSchemasToChange: IQOneToManyRelation<RepoTransBlockSchemaToChange, QRepoTransBlockSchemaToChange>;

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
	extends IQRelation<RepositoryTransactionBlock, QRepositoryTransactionBlock>, QRepositoryTransactionBlockQId {
}

