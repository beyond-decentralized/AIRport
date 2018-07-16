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
} from './qdatabase';
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
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdate,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabaseRepository extends IShardedRecord {
	
	// Id Properties

	// Id Relations
	database?: IDatabase;
	repositoryShard?: IShard;
	repository?: IRepository;

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
export interface DatabaseRepositoryESelect
    extends ShardedRecordESelect, DatabaseRepositoryEOptionalId, DatabaseRepositoryEUpdate {
	// Id Relations - full property interfaces
	database?: DatabaseESelect;
	repositoryShard?: ShardESelect;
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseRepositoryEId
    extends ShardedRecordEId {
	// Id Properties

	// Id Relations - Ids only
	database: DatabaseEId;
	repositoryShard: ShardEId;
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseRepositoryEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	database?: DatabaseEOptionalId;
	repositoryShard?: ShardEOptionalId;
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseRepositoryEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseRepositoryECreate
extends DatabaseRepositoryEId, DatabaseRepositoryEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabaseRepository extends QShardedRecord
{
	// Id Fields

	// Id Relations
	database: QDatabaseQRelation;
	repositoryShard: QShardQRelation;
	repository: QRepositoryQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QDatabaseRepositoryQId extends QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	database: QDatabaseQId;
	repositoryShard: QShardQId;
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QDatabaseRepositoryQRelation
	extends QShardedRecordQRelation<QDatabaseRepository>, QDatabaseRepositoryQId {
}

