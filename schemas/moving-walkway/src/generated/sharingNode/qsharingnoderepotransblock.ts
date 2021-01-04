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
	SharingNodeGraph,
	SharingNodeEId,
	SharingNodeEOptionalId,
	SharingNodeEUpdateProperties,
	SharingNodeESelect,
	QSharingNode,
	QSharingNodeQId,
	QSharingNodeQRelation,
} from './qsharingnode';
import {
	SharingNode,
} from '../../ddl/sharingNode/SharingNode';
import {
	RepositoryTransactionBlockGraph,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockEOptionalId,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockESelect,
	QRepositoryTransactionBlock,
	QRepositoryTransactionBlockQId,
	QRepositoryTransactionBlockQRelation,
} from '../repositoryTransactionBlock/qrepositorytransactionblock';
import {
	RepositoryTransactionBlock,
} from '../../ddl/repositoryTransactionBlock/RepositoryTransactionBlock';
import {
	SharingNodeRepoTransBlock,
} from '../../ddl/sharingNode/SharingNodeRepoTransBlock';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockESelect
    extends IEntitySelectProperties, SharingNodeRepoTransBlockEOptionalId {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Id Relations - full property interfaces
	sharingNode?: SharingNodeESelect;
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepoTransBlockEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingNode: SharingNodeEId;
	repositoryTransactionBlock: RepositoryTransactionBlockEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepoTransBlockEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingNode?: SharingNodeEOptionalId;
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeRepoTransBlockGraph
	extends SharingNodeRepoTransBlockEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Relations
	sharingNode?: SharingNodeGraph;
	repositoryTransactionBlock?: RepositoryTransactionBlockGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SYNC_STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockECreateProperties
extends Partial<SharingNodeRepoTransBlockEId>, SharingNodeRepoTransBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockECreateColumns
extends SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlock extends IQEntity<SharingNodeRepoTransBlock>
{
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQRelation;
	repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;

	// Non-Id Fields
	syncStatus: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingNodeRepoTransBlockQId
{
	
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQId;
	repositoryTransactionBlock: QRepositoryTransactionBlockQId;


}

// Entity Relation Interface
export interface QSharingNodeRepoTransBlockQRelation
	extends IQRelation<SharingNodeRepoTransBlock, QSharingNodeRepoTransBlock>, QSharingNodeRepoTransBlockQId {
}

