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
	ISharingNode,
	SharingNodeEId,
	SharingNodeEOptionalId,
	SharingNodeEUpdateProperties,
	SharingNodeESelect,
	QSharingNode,
	QSharingNodeQId,
	QSharingNodeQRelation,
} from '../sharingnode/qsharingnode';
import {
	ISharingMessageRepoTransBlock,
	SharingMessageRepoTransBlockEId,
	SharingMessageRepoTransBlockEOptionalId,
	SharingMessageRepoTransBlockEUpdateProperties,
	SharingMessageRepoTransBlockESelect,
	QSharingMessageRepoTransBlock,
	QSharingMessageRepoTransBlockQId,
	QSharingMessageRepoTransBlockQRelation,
} from './qsharingmessagerepotransblock';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingMessage {
	
	// Id Properties
	id?: number;

	// Id Relations
	sharingNode?: ISharingNode;

	// Non-Id Properties
	origin?: number;
	agtSharingMessageId?: number;
	syncTimestamp?: Date;

	// Non-Id Relations
	sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageESelect
    extends IEntitySelectProperties, SharingMessageEOptionalId {
	// Non-Id Properties
	origin?: number | IQNumberField;
	agtSharingMessageId?: number | IQNumberField;
	syncTimestamp?: Date | IQDateField;

	// Id Relations - full property interfaces
	sharingNode?: SharingNodeESelect;

  // Non-Id relations (including OneToMany's)
	sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	sharingNode: SharingNodeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	sharingNode?: SharingNodeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	origin?: number | IQNumberField;
	agtSharingMessageId?: number | IQNumberField;
	syncTimestamp?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ORIGIN?: number | IQNumberField;
	AGT_SHARING_MESSAGE_ID?: number | IQNumberField;
	SYNC_TIMESTAMP?: Date | IQDateField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageECreateProperties
extends Partial<SharingMessageEId>, SharingMessageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageECreateColumns
extends SharingMessageEId, SharingMessageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessage extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	sharingNode: QSharingNodeQRelation;

	// Non-Id Fields
	origin: IQNumberField;
	agtSharingMessageId: IQNumberField;
	syncTimestamp: IQDateField;

	// Non-Id Relations
	sharingMessageRepoTransBlocks: IQOneToManyRelation<QSharingMessageRepoTransBlock>;

}


// Entity Id Interface
export interface QSharingMessageQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	sharingNode: QSharingNodeQId;


}

// Entity Relation Interface
export interface QSharingMessageQRelation
	extends IQRelation<QSharingMessage>, QSharingMessageQId {
}

