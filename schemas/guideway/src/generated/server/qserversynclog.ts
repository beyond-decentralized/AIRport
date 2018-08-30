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
	IServer,
	ServerEId,
	ServerEOptionalId,
	ServerEUpdateProperties,
	ServerESelect,
	QServer,
	QServerQId,
	QServerQRelation,
} from './qserver';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServerSyncLog {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	type?: number;
	startDatetime?: Date;
	endDatetime?: Date;
	numberOfConnections?: number;
	numberOfRecords?: number;
	dataCharsTotal?: number;

	// Non-Id Relations
	server?: IServer;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerSyncLogESelect
    extends IEntitySelectProperties, ServerSyncLogEOptionalId {
	// Non-Id Properties
	type?: number | IQNumberField;
	startDatetime?: Date | IQDateField;
	endDatetime?: Date | IQDateField;
	numberOfConnections?: number | IQNumberField;
	numberOfRecords?: number | IQNumberField;
	dataCharsTotal?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	server?: ServerESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerSyncLogEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ServerSyncLogEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ServerSyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	type?: number | IQNumberField;
	startDatetime?: Date | IQDateField;
	endDatetime?: Date | IQDateField;
	numberOfConnections?: number | IQNumberField;
	numberOfRecords?: number | IQNumberField;
	dataCharsTotal?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	server?: ServerEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ServerSyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TYPE?: number | IQNumberField;
	START_DATETIME?: Date | IQDateField;
	PROCESSED_DATETIME?: Date | IQDateField;
	NUMBER_OF_CONNECTIONS?: number | IQNumberField;
	NUMBER_OF_SYNC_RECORDS?: number | IQNumberField;
	DATA_CHARS_TOTAL?: number | IQNumberField;
	SERVER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerSyncLogECreateProperties
extends Partial<ServerSyncLogEId>, ServerSyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ServerSyncLogECreateColumns
extends ServerSyncLogEId, ServerSyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServerSyncLog extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	type: IQNumberField;
	startDatetime: IQDateField;
	endDatetime: IQDateField;
	numberOfConnections: IQNumberField;
	numberOfRecords: IQNumberField;
	dataCharsTotal: IQNumberField;

	// Non-Id Relations
	server: QServerQRelation;

}


// Entity Id Interface
export interface QServerSyncLogQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QServerSyncLogQRelation
	extends QRelation<QServerSyncLog>, QServerSyncLogQId {
}

