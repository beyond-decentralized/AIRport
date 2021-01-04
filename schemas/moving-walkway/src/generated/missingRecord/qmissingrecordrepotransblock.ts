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
	MissingRecordGraph,
	MissingRecordEId,
	MissingRecordEOptionalId,
	MissingRecordEUpdateProperties,
	MissingRecordESelect,
	QMissingRecord,
	QMissingRecordQId,
	QMissingRecordQRelation,
} from './qmissingrecord';
import {
	MissingRecord,
} from '../../ddl/missingRecord/MissingRecord';
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
	MissingRecordRepoTransBlock,
} from '../../ddl/missingRecord/MissingRecordRepoTransBlock';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockESelect
    extends IEntitySelectProperties, MissingRecordRepoTransBlockEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	missingRecord?: MissingRecordESelect;
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordRepoTransBlockEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordRepoTransBlockEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	missingRecord?: MissingRecordEOptionalId;
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MissingRecordRepoTransBlockGraph
	extends MissingRecordRepoTransBlockEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	missingRecord?: MissingRecordGraph;
	repositoryTransactionBlock?: RepositoryTransactionBlockGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordRepoTransBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	MISSING_RECORD_ID?: number | IQNumberField;
	REPOSITORY_TRANSACTION_BLOCK_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockECreateProperties
extends Partial<MissingRecordRepoTransBlockEId>, MissingRecordRepoTransBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordRepoTransBlockECreateColumns
extends MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecordRepoTransBlock extends IQEntity<MissingRecordRepoTransBlock>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	missingRecord: QMissingRecordQRelation;
	repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;

}


// Entity Id Interface
export interface QMissingRecordRepoTransBlockQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMissingRecordRepoTransBlockQRelation
	extends IQRelation<MissingRecordRepoTransBlock, QMissingRecordRepoTransBlock>, QMissingRecordRepoTransBlockQId {
}

