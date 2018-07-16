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
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdate,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';
import {
	IDatabaseRepository,
	DatabaseRepositoryEId,
	DatabaseRepositoryEOptionalId,
	DatabaseRepositoryEUpdate,
	DatabaseRepositoryESelect,
	QDatabaseRepository,
	QDatabaseRepositoryQId,
	QDatabaseRepositoryQRelation,
} from './qdatabaserepository';
import {
	IDatabaseSyncLog,
	DatabaseSyncLogEId,
	DatabaseSyncLogEOptionalId,
	DatabaseSyncLogEUpdate,
	DatabaseSyncLogESelect,
	QDatabaseSyncLog,
	QDatabaseSyncLogQId,
	QDatabaseSyncLogQRelation,
} from '../syncronization/qdatabasesynclog';
import {
	IDatabaseVerificationStage,
	DatabaseVerificationStageEId,
	DatabaseVerificationStageEOptionalId,
	DatabaseVerificationStageEUpdate,
	DatabaseVerificationStageESelect,
	QDatabaseVerificationStage,
	QDatabaseVerificationStageQId,
	QDatabaseVerificationStageQRelation,
} from './qdatabaseverificationstage';
import {
	IDatabaseRepositoryVerificationStage,
	DatabaseRepositoryVerificationStageEId,
	DatabaseRepositoryVerificationStageEOptionalId,
	DatabaseRepositoryVerificationStageEUpdate,
	DatabaseRepositoryVerificationStageESelect,
	QDatabaseRepositoryVerificationStage,
	QDatabaseRepositoryVerificationStageQId,
	QDatabaseRepositoryVerificationStageQRelation,
} from './qdatabaserepositoryverificationstage';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabase extends IShardedRecord {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	hash?: string;
	lastPollConnectionDatetime?: number;
	lastSseConnectionDatetime?: number;

	// Non-Id Relations
	currentShard?: IShard;
	user?: IUser;
	databaseRepositories?: IDatabaseRepository[];
	databaseSyncLogs?: IDatabaseSyncLog[];
	verificationStage?: IDatabaseVerificationStage[];
	repositoryVerificationStage?: IDatabaseRepositoryVerificationStage[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseESelect
    extends ShardedRecordESelect, DatabaseEOptionalId, DatabaseEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	currentShard?: ShardESelect;
	user?: UserESelect;
	databaseRepositories?: DatabaseRepositoryESelect;
	databaseSyncLogs?: DatabaseSyncLogESelect;
	verificationStage?: DatabaseVerificationStageESelect;
	repositoryVerificationStage?: DatabaseRepositoryVerificationStageESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseEId
    extends ShardedRecordEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	hash?: string | IQStringField;
	lastPollConnectionDatetime?: number | IQNumberField;
	lastSseConnectionDatetime?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	currentShard?: ShardEOptionalId;
	user?: UserEOptionalId;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseECreate
extends DatabaseEId, DatabaseEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabase extends QShardedRecord
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	hash: IQStringField;
	lastPollConnectionDatetime: IQNumberField;
	lastSseConnectionDatetime: IQNumberField;

	// Non-Id Relations
	currentShard: QShardQRelation;
	user: QUserQRelation;
	databaseRepositories: IQOneToManyRelation<QDatabaseRepository>;
	databaseSyncLogs: IQOneToManyRelation<QDatabaseSyncLog>;
	verificationStage: IQOneToManyRelation<QDatabaseVerificationStage>;
	repositoryVerificationStage: IQOneToManyRelation<QDatabaseRepositoryVerificationStage>;

}


// Entity Id Interface
export interface QDatabaseQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDatabaseQRelation
	extends QShardedRecordQRelation<QDatabase>, QDatabaseQId {
}

