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
	IMissingRecord,
	MissingRecordEId,
	MissingRecordEOptionalId,
	MissingRecordEUpdateProperties,
	MissingRecordESelect,
	QMissingRecord,
	QMissingRecordQId,
	QMissingRecordQRelation,
} from './qmissingrecord';
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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMissingRecordSharingMessage {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	missingRecord?: IMissingRecord;
	sharingMessage?: ISharingMessage;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordSharingMessageESelect
    extends IEntitySelectProperties, MissingRecordSharingMessageEOptionalId, MissingRecordSharingMessageEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	missingRecord?: MissingRecordESelect;
	sharingMessage?: SharingMessageESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordSharingMessageEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordSharingMessageEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordSharingMessageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	missingRecord?: MissingRecordEOptionalId;
	sharingMessage?: SharingMessageEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordSharingMessageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	MISSING_RECORD_ID?: number | IQNumberField;
	SHARING_MESSAGE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordSharingMessageECreateProperties
extends MissingRecordSharingMessageEId, MissingRecordSharingMessageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordSharingMessageECreateColumns
extends MissingRecordSharingMessageEId, MissingRecordSharingMessageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecordSharingMessage extends QEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	missingRecord: QMissingRecordQRelation;
	sharingMessage: QSharingMessageQRelation;

}


// Entity Id Interface
export interface QMissingRecordSharingMessageQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMissingRecordSharingMessageQRelation
	extends QRelation<QMissingRecordSharingMessage>, QMissingRecordSharingMessageQId {
}

