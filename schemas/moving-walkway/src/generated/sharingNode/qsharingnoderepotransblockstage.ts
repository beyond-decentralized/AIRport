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

export interface ISharingNodeRepoTransBlockStage {
	
	// Id Properties
	sharingNodeId?: number;
	repositoryTransactionBlockId?: number;

	// Id Relations

	// Non-Id Properties
	syncStatus?: number;

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
export interface SharingNodeRepoTransBlockStageESelect
    extends IEntitySelectProperties, SharingNodeRepoTransBlockStageEOptionalId {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepoTransBlockStageEId
    extends IEntityIdProperties {
	// Id Properties
	sharingNodeId: number | IQNumberField;
	repositoryTransactionBlockId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepoTransBlockStageEOptionalId {
	// Id Properties
	sharingNodeId?: number | IQNumberField;
	repositoryTransactionBlockId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	syncStatus?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SYNC_STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateProperties
extends Partial<SharingNodeRepoTransBlockStageEId>, SharingNodeRepoTransBlockStageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateColumns
extends SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlockStage extends QEntity
{
	// Id Fields
	sharingNodeId: IQNumberField;
	repositoryTransactionBlockId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	syncStatus: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingNodeRepoTransBlockStageQId
{
	
	// Id Fields
	sharingNodeId: IQNumberField;
	repositoryTransactionBlockId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSharingNodeRepoTransBlockStageQRelation
	extends QRelation<QSharingNodeRepoTransBlockStage>, QSharingNodeRepoTransBlockStageQId {
}

