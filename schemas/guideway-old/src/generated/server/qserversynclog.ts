import {
	IQEntityInternal,
	IEntityIdProperties,
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
	IShardedRecord,
	ShardedRecordEId,
	ShardedRecordEUpdate,
	ShardedRecordESelect,
	QShardedRecordQId,
	QShardedRecordQRelation,
	QShardedRecord,
} from '../qshardedrecord';
import {
	IServer,
	ServerEId,
	ServerEOptionalId,
	ServerEUpdate,
	ServerESelect,
	QServer,
	QServerQId,
	QServerQRelation,
} from './qserver';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServerSyncLog extends IShardedRecord {
	
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
    extends ShardedRecordESelect, ServerSyncLogEOptionalId, ServerSyncLogEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	server?: ServerESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerSyncLogEId
    extends ShardedRecordEId {
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
export interface ServerSyncLogEUpdate
	extends ShardedRecordEUpdate {
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
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerSyncLogECreate
extends ServerSyncLogEId, ServerSyncLogEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServerSyncLog extends QShardedRecord
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
export interface QServerSyncLogQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QServerSyncLogQRelation
	extends QShardedRecordQRelation<QServerSyncLog>, QServerSyncLogQId {
}

