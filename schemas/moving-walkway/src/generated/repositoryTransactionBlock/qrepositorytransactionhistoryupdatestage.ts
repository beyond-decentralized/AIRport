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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTransactionHistoryUpdateStage {
	
	// Id Properties
	repositoryTransactionHistoryId?: number;

	// Id Relations

	// Non-Id Properties
	blockId?: number;

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
export interface RepositoryTransactionHistoryUpdateStageESelect
    extends IEntitySelectProperties, RepositoryTransactionHistoryUpdateStageEOptionalId, RepositoryTransactionHistoryUpdateStageEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryUpdateStageEId
    extends IEntityIdProperties {
	// Id Properties
	repositoryTransactionHistoryId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEOptionalId {
	// Id Properties
	repositoryTransactionHistoryId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	blockId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	BLOCK_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageECreateProperties
extends Partial<RepositoryTransactionHistoryUpdateStageEId>, RepositoryTransactionHistoryUpdateStageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageECreateColumns
extends RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionHistoryUpdateStage extends QEntity
{
	// Id Fields
	repositoryTransactionHistoryId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	blockId: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryTransactionHistoryUpdateStageQId
{
	
	// Id Fields
	repositoryTransactionHistoryId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryTransactionHistoryUpdateStageQRelation
	extends QRelation<QRepositoryTransactionHistoryUpdateStage>, QRepositoryTransactionHistoryUpdateStageQId {
}

