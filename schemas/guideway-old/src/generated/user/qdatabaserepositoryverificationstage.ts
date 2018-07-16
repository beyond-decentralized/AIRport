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
	IDatabase,
	DatabaseEId,
	DatabaseEOptionalId,
	DatabaseEUpdate,
	DatabaseESelect,
	QDatabase,
	QDatabaseQId,
	QDatabaseQRelation,
} from './qdatabase';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdate,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
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
	IRepositoryDatabase,
	RepositoryDatabaseEId,
	RepositoryDatabaseEOptionalId,
	RepositoryDatabaseEUpdate,
	RepositoryDatabaseESelect,
	QRepositoryDatabase,
	QRepositoryDatabaseQId,
	QRepositoryDatabaseQRelation,
} from '../repository/qrepositorydatabase';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabaseRepositoryVerificationStage {
	
	// Id Properties
	serverId?: number;
	runId?: number;

	// Id Relations
	shard?: IShard;
	database?: IDatabase;
	repository?: IRepository;
	databaseRepository?: IDatabaseRepository;
	repositoryDatabase?: IRepositoryDatabase;

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
export interface DatabaseRepositoryVerificationStageESelect
    extends IEntitySelectProperties, DatabaseRepositoryVerificationStageEOptionalId, DatabaseRepositoryVerificationStageEUpdate {
	// Id Relations - full property interfaces
	shard?: ShardESelect;
	database?: DatabaseESelect;
	repository?: RepositoryESelect;
	databaseRepository?: DatabaseRepositoryESelect;
	repositoryDatabase?: RepositoryDatabaseESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseRepositoryVerificationStageEId
    extends IEntityIdProperties {
	// Id Properties
	serverId: number | IQNumberField;
	runId: number | IQNumberField;

	// Id Relations - Ids only
	shard: ShardEId;
	database: DatabaseEId;
	repository: RepositoryEId;
	databaseRepository: DatabaseRepositoryEId;
	repositoryDatabase: RepositoryDatabaseEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseRepositoryVerificationStageEOptionalId {
	// Id Properties
	serverId?: number | IQNumberField;
	runId?: number | IQNumberField;

	// Id Relations - Ids only
	shard?: ShardEOptionalId;
	database?: DatabaseEOptionalId;
	repository?: RepositoryEOptionalId;
	databaseRepository?: DatabaseRepositoryEOptionalId;
	repositoryDatabase?: RepositoryDatabaseEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseRepositoryVerificationStageEUpdate
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseRepositoryVerificationStageECreate
extends DatabaseRepositoryVerificationStageEId, DatabaseRepositoryVerificationStageEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabaseRepositoryVerificationStage extends QEntity
{
	// Id Fields
	serverId: IQNumberField;
	runId: IQNumberField;

	// Id Relations
	shard: QShardQRelation;
	database: QDatabaseQRelation;
	repository: QRepositoryQRelation;
	databaseRepository: QDatabaseRepositoryQRelation;
	repositoryDatabase: QRepositoryDatabaseQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QDatabaseRepositoryVerificationStageQId
{
	
	// Id Fields
	serverId: IQNumberField;
	runId: IQNumberField;

	// Id Relations
	shard: QShardQId;
	database: QDatabaseQId;
	repository: QRepositoryQId;
	databaseRepository: QDatabaseRepositoryQId;
	repositoryDatabase: QRepositoryDatabaseQId;


}

// Entity Relation Interface
export interface QDatabaseRepositoryVerificationStageQRelation
	extends QRelation<QDatabaseRepositoryVerificationStage>, QDatabaseRepositoryVerificationStageQId {
}

