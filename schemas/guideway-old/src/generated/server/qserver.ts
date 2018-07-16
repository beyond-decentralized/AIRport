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
	IServerSyncLog,
	ServerSyncLogEId,
	ServerSyncLogEOptionalId,
	ServerSyncLogEUpdate,
	ServerSyncLogESelect,
	QServerSyncLog,
	QServerSyncLogQId,
	QServerSyncLogQRelation,
} from './qserversynclog';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServer extends IShardedRecord {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	serverType?: number;

	// Non-Id Relations
	serverSyncLogs?: IServerSyncLog[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerESelect
    extends ShardedRecordESelect, ServerEOptionalId, ServerEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	serverSyncLogs?: ServerSyncLogESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerEId
    extends ShardedRecordEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ServerEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ServerEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	serverType?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerECreate
extends ServerEId, ServerEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServer extends QShardedRecord
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	serverType: IQNumberField;

	// Non-Id Relations
	serverSyncLogs: IQOneToManyRelation<QServerSyncLog>;

}


// Entity Id Interface
export interface QServerQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QServerQRelation
	extends QShardedRecordQRelation<QServer>, QServerQId {
}

