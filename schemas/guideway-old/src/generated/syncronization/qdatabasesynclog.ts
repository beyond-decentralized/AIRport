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
	IDatabase,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdate,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
} from '../user/qdatabase';
import {
	ISyncLog,
	SyncLogEId,
	SyncLogEOptionalId,
	SyncLogEUpdate,
	SyncLogESelect,
	QSyncLog,
	QSyncLogQId,
	QSyncLogQRelation,
} from './qsynclog';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabaseSyncLog extends IShardedRecord {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	state?: number;

	// Non-Id Relations
	database?: IDatabase;
	syncLogs?: ISyncLog[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseSyncLogESelect
    extends ShardedRecordESelect, DatabaseSyncLogEOptionalId, DatabaseSyncLogEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	database?: DatabaseESelect;
	syncLogs?: SyncLogESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseSyncLogEId
    extends ShardedRecordEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseSyncLogEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseSyncLogEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	state?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	database?: DatabaseEOptionalId;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseSyncLogECreate
extends DatabaseSyncLogEId, DatabaseSyncLogEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabaseSyncLog extends QShardedRecord
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	state: IQNumberField;

	// Non-Id Relations
	database: QDatabaseQRelation;
	syncLogs: IQOneToManyRelation<QSyncLog>;

}


// Entity Id Interface
export interface QDatabaseSyncLogQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDatabaseSyncLogQRelation
	extends QShardedRecordQRelation<QDatabaseSyncLog>, QDatabaseSyncLogQId {
}

