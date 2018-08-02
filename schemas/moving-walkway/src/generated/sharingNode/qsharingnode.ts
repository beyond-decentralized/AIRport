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
	ISharingMessage,
	SharingMessageEId,
	SharingMessageEOptionalId,
	SharingMessageEUpdateProperties,
	SharingMessageESelect,
	QSharingMessage,
	QSharingMessageQId,
	QSharingMessageQRelation,
} from '../sharingMessage/qsharingmessage';
import {
	ISharingNodeRepoTransBlock,
	SharingNodeRepoTransBlockEId,
	SharingNodeRepoTransBlockEOptionalId,
	SharingNodeRepoTransBlockEUpdateProperties,
	SharingNodeRepoTransBlockESelect,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockQId,
	QSharingNodeRepoTransBlockQRelation,
} from './qsharingnoderepotransblock';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingNode {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	sharingMechanism?: number;
	isActive?: boolean;
	syncFrequency?: number;
	connectionProtocol?: number;
	connectionUrl?: string;

	// Non-Id Relations
	messages?: ISharingMessage[];
	sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeESelect
    extends IEntitySelectProperties, SharingNodeEOptionalId, SharingNodeEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	messages?: SharingMessageESelect;
	sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	sharingMechanism?: number | IQNumberField;
	isActive?: boolean | IQBooleanField;
	syncFrequency?: number | IQNumberField;
	connectionProtocol?: number | IQNumberField;
	connectionUrl?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SHARING_MECHANISM?: number | IQNumberField;
	IS_ACTIVE?: boolean | IQBooleanField;
	SYNC_FREQUENCY?: number | IQNumberField;
	CONNECTION_PROTOCOL?: number | IQNumberField;
	CONNECTION_URL?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeECreateProperties
extends SharingNodeEId, SharingNodeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeECreateColumns
extends SharingNodeEId, SharingNodeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNode extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	sharingMechanism: IQNumberField;
	isActive: IQBooleanField;
	syncFrequency: IQNumberField;
	connectionProtocol: IQNumberField;
	connectionUrl: IQStringField;

	// Non-Id Relations
	messages: IQOneToManyRelation<QSharingMessage>;
	sharingNodeRepoTransBlocks: IQOneToManyRelation<QSharingNodeRepoTransBlock>;

}


// Entity Id Interface
export interface QSharingNodeQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSharingNodeQRelation
	extends QRelation<QSharingNode>, QSharingNodeQId {
}

