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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ISharingMessage,
	SharingMessageEId,
	SharingMessageEOptionalId,
	SharingMessageEUpdateProperties,
	SharingMessageESelect,
	QSharingMessage,
	QSharingMessageQId,
	QSharingMessageQRelation,
} from './qsharingmessage';
import {
	IRepositoryTransactionBlock,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockEOptionalId,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockESelect,
	QRepositoryTransactionBlock,
	QRepositoryTransactionBlockQId,
	QRepositoryTransactionBlockQRelation,
} from '../repositorytransactionblock/qrepositorytransactionblock';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingMessageRepoTransBlock {
	
	// Id Properties

	// Id Relations
	sharingMessage?: ISharingMessage;
	repositoryTransactionBlock?: IRepositoryTransactionBlock;

	// Non-Id Properties

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockESelect
    extends IEntitySelectProperties, SharingMessageRepoTransBlockEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	sharingMessage?: SharingMessageESelect;
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageRepoTransBlockEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage: SharingMessageEId;
	repositoryTransactionBlock: RepositoryTransactionBlockEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageRepoTransBlockEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage?: SharingMessageEOptionalId;
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageRepoTransBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockECreateProperties
extends Partial<SharingMessageRepoTransBlockEId>, SharingMessageRepoTransBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageRepoTransBlockECreateColumns
extends SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessageRepoTransBlock extends IQEntity
{
	// Id Fields

	// Id Relations
	sharingMessage: QSharingMessageQRelation;
	repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingMessageRepoTransBlockQId
{
	
	// Id Fields

	// Id Relations
	sharingMessage: QSharingMessageQId;
	repositoryTransactionBlock: QRepositoryTransactionBlockQId;


}

// Entity Relation Interface
export interface QSharingMessageRepoTransBlockQRelation
	extends IQRelation<QSharingMessageRepoTransBlock>, QSharingMessageRepoTransBlockQId {
}

