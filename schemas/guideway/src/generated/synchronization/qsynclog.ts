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
	AgtSharingMessageGraph,
	AgtSharingMessageEId,
	AgtSharingMessageEOptionalId,
	AgtSharingMessageEUpdateProperties,
	AgtSharingMessageESelect,
	QAgtSharingMessage,
	QAgtSharingMessageQId,
	QAgtSharingMessageQRelation,
} from './qagtsharingmessage';
import {
	AgtRepositoryTransactionBlockGraph,
	AgtRepositoryTransactionBlockEId,
	AgtRepositoryTransactionBlockEOptionalId,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockESelect,
	QAgtRepositoryTransactionBlock,
	QAgtRepositoryTransactionBlockQId,
	QAgtRepositoryTransactionBlockQRelation,
} from './qagtrepositorytransactionblock';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SyncLogESelect
    extends IEntitySelectProperties, SyncLogEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	sharingMessage?: AgtSharingMessageESelect;
	repositoryTransactionBlock?: AgtRepositoryTransactionBlockESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SyncLogEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage: AgtSharingMessageEId;
	repositoryTransactionBlock: AgtRepositoryTransactionBlockEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SyncLogEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage?: AgtSharingMessageEOptionalId;
	repositoryTransactionBlock?: AgtRepositoryTransactionBlockEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SyncLogGraph
	extends SyncLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	sharingMessage?: AgtSharingMessageGraph;
	repositoryTransactionBlock?: AgtRepositoryTransactionBlockGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SyncLogECreateProperties
extends Partial<SyncLogEId>, SyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SyncLogECreateColumns
extends SyncLogEId, SyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSyncLog extends IQEntity
{
	// Id Fields

	// Id Relations
	sharingMessage: QAgtSharingMessageQRelation;
	repositoryTransactionBlock: QAgtRepositoryTransactionBlockQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSyncLogQId
{
	
	// Id Fields

	// Id Relations
	sharingMessage: QAgtSharingMessageQId;
	repositoryTransactionBlock: QAgtRepositoryTransactionBlockQId;


}

// Entity Relation Interface
export interface QSyncLogQRelation
	extends IQRelation<QSyncLog>, QSyncLogQId {
}

