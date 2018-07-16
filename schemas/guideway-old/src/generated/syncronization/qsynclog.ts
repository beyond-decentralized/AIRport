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
	IDatabaseSyncLog,
	DatabaseSyncLogEId,
	DatabaseSyncLogEOptionalId,
	DatabaseSyncLogEUpdate,
	DatabaseSyncLogESelect,
	QDatabaseSyncLog,
	QDatabaseSyncLogQId,
	QDatabaseSyncLogQRelation,
} from './qdatabasesynclog';
import {
	ISyncRecord,
	SyncRecordEId,
	SyncRecordEOptionalId,
	SyncRecordEUpdate,
	SyncRecordESelect,
	QSyncRecord,
	QSyncRecordQId,
	QSyncRecordQRelation,
} from './qsyncrecord';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISyncLog extends IShardedRecord {
	
	// Id Properties

	// Id Relations
	databaseSyncLog?: IDatabaseSyncLog;
	syncRecord?: ISyncRecord;

	// Non-Id Properties
	syncRecordAddDatetime?: number;

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
export interface SyncLogESelect
    extends ShardedRecordESelect, SyncLogEOptionalId, SyncLogEUpdate {
	// Id Relations - full property interfaces
	databaseSyncLog?: DatabaseSyncLogESelect;
	syncRecord?: SyncRecordESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SyncLogEId
    extends ShardedRecordEId {
	// Id Properties

	// Id Relations - Ids only
	databaseSyncLog: DatabaseSyncLogEId;
	syncRecord: SyncRecordEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SyncLogEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	databaseSyncLog?: DatabaseSyncLogEOptionalId;
	syncRecord?: SyncRecordEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SyncLogEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	syncRecordAddDatetime?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SyncLogECreate
extends SyncLogEId, SyncLogEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSyncLog extends QShardedRecord
{
	// Id Fields

	// Id Relations
	databaseSyncLog: QDatabaseSyncLogQRelation;
	syncRecord: QSyncRecordQRelation;

	// Non-Id Fields
	syncRecordAddDatetime: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSyncLogQId extends QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	databaseSyncLog: QDatabaseSyncLogQId;
	syncRecord: QSyncRecordQId;


}

// Entity Relation Interface
export interface QSyncLogQRelation
	extends QShardedRecordQRelation<QSyncLog>, QSyncLogQId {
}

