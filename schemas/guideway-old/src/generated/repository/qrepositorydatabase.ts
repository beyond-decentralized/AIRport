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
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdate,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
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
} from '../user/qdatabase';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryDatabase extends IShardedRecord {
	
	// Id Properties

	// Id Relations
	repository?: IRepository;
	databaseShard?: IShard;
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
export interface RepositoryDatabaseESelect
    extends ShardedRecordESelect, RepositoryDatabaseEOptionalId, RepositoryDatabaseEUpdate {
	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	databaseShard?: ShardESelect;
	database?: DatabaseESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryDatabaseEId
    extends ShardedRecordEId {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	databaseShard: ShardEId;
	database: DatabaseEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryDatabaseEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	databaseShard?: ShardEOptionalId;
	database?: DatabaseEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryDatabaseEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryDatabaseECreate
extends RepositoryDatabaseEId, RepositoryDatabaseEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryDatabase extends QShardedRecord
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	databaseShard: QShardQRelation;
	database: QDatabaseQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryDatabaseQId extends QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	databaseShard: QShardQId;
	database: QDatabaseQId;


}

// Entity Relation Interface
export interface QRepositoryDatabaseQRelation
	extends QShardedRecordQRelation<QRepositoryDatabase>, QRepositoryDatabaseQId {
}

