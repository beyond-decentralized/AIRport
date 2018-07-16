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
	IShard,
	ShardEId,
	ShardEOptionalId,
	ShardEUpdate,
	ShardESelect,
	QShard,
	QShardQId,
	QShardQRelation,
} from '@airport/airport-code';
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
	IDatabase,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdate,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
} from '../user/qdatabase';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabaseSyncLogVerificationStage {
	
	// Id Properties
	serverId?: number;
	runId?: number;

	// Id Relations
	shard?: IShard;
	databaseSyncLog?: IDatabaseSyncLog;
	database?: IDatabase;

	// Non-Id Properties

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
export interface DatabaseSyncLogVerificationStageESelect
    extends IEntitySelectProperties, DatabaseSyncLogVerificationStageEOptionalId, DatabaseSyncLogVerificationStageEUpdate {
	// Id Relations - full property interfaces
	shard?: ShardESelect;
	databaseSyncLog?: DatabaseSyncLogESelect;
	database?: DatabaseESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseSyncLogVerificationStageEId
    extends IEntityIdProperties {
	// Id Properties
	serverId: number | IQNumberField;
	runId: number | IQNumberField;

	// Id Relations - Ids only
	shard: ShardEId;
	databaseSyncLog: DatabaseSyncLogEId;
	database: DatabaseEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseSyncLogVerificationStageEOptionalId {
	// Id Properties
	serverId?: number | IQNumberField;
	runId?: number | IQNumberField;

	// Id Relations - Ids only
	shard?: ShardEOptionalId;
	databaseSyncLog?: DatabaseSyncLogEOptionalId;
	database?: DatabaseEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseSyncLogVerificationStageEUpdate
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseSyncLogVerificationStageECreate
extends DatabaseSyncLogVerificationStageEId, DatabaseSyncLogVerificationStageEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabaseSyncLogVerificationStage extends QEntity
{
	// Id Fields
	serverId: IQNumberField;
	runId: IQNumberField;

	// Id Relations
	shard: QShardQRelation;
	databaseSyncLog: QDatabaseSyncLogQRelation;
	database: QDatabaseQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QDatabaseSyncLogVerificationStageQId
{
	
	// Id Fields
	serverId: IQNumberField;
	runId: IQNumberField;

	// Id Relations
	shard: QShardQId;
	databaseSyncLog: QDatabaseSyncLogQId;
	database: QDatabaseQId;


}

// Entity Relation Interface
export interface QDatabaseSyncLogVerificationStageQRelation
	extends QRelation<QDatabaseSyncLogVerificationStage>, QDatabaseSyncLogVerificationStageQId {
}

