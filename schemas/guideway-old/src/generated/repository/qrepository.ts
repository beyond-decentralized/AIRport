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
	IRepositoryDatabase,
	RepositoryDatabaseEId,
	RepositoryDatabaseEOptionalId,
	RepositoryDatabaseEUpdate,
	RepositoryDatabaseESelect,
	QRepositoryDatabase,
	QRepositoryDatabaseQId,
	QRepositoryDatabaseQRelation,
} from './qrepositorydatabase';
import {
	ISyncRecord,
	SyncRecordEId,
	SyncRecordEOptionalId,
	SyncRecordEUpdate,
	SyncRecordESelect,
	QSyncRecord,
	QSyncRecordQId,
	QSyncRecordQRelation,
} from '../syncronization/qsyncrecord';
import {
	IDatabaseRepositoryVerificationStage,
	DatabaseRepositoryVerificationStageEId,
	DatabaseRepositoryVerificationStageEOptionalId,
	DatabaseRepositoryVerificationStageEUpdate,
	DatabaseRepositoryVerificationStageESelect,
	QDatabaseRepositoryVerificationStage,
	QDatabaseRepositoryVerificationStageQId,
	QDatabaseRepositoryVerificationStageQRelation,
} from '../user/qdatabaserepositoryverificationstage';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository extends IShardedRecord {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	lastUpdateTime?: Date;

	// Non-Id Relations
	currentShard?: IShard;
	repositoryDatabases?: IRepositoryDatabase[];
	syncRecords?: ISyncRecord[];
	databaseVerificationStage?: IDatabaseRepositoryVerificationStage[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends ShardedRecordESelect, RepositoryEOptionalId, RepositoryEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	currentShard?: ShardESelect;
	repositoryDatabases?: RepositoryDatabaseESelect;
	syncRecords?: SyncRecordESelect;
	databaseVerificationStage?: DatabaseRepositoryVerificationStageESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends ShardedRecordEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	lastUpdateTime?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's
	currentShard?: ShardEOptionalId;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreate
extends RepositoryEId, RepositoryEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends QShardedRecord
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	lastUpdateTime: IQDateField;

	// Non-Id Relations
	currentShard: QShardQRelation;
	repositoryDatabases: IQOneToManyRelation<QRepositoryDatabase>;
	syncRecords: IQOneToManyRelation<QSyncRecord>;
	databaseVerificationStage: IQOneToManyRelation<QDatabaseRepositoryVerificationStage>;

}


// Entity Id Interface
export interface QRepositoryQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends QShardedRecordQRelation<QRepository>, QRepositoryQId {
}

