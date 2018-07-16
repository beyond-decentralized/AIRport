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
} from '../repository/qrepository';
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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUserRepository extends IShardedRecord {
	
	// Id Properties

	// Id Relations
	repository?: IRepository;
	repositoryShard?: IShard;
	user?: IUser;

	// Non-Id Properties
	permission?: number;

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
export interface UserRepositoryESelect
    extends ShardedRecordESelect, UserRepositoryEOptionalId, UserRepositoryEUpdate {
	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	repositoryShard?: ShardESelect;
	user?: UserESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserRepositoryEId
    extends ShardedRecordEId {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	repositoryShard: ShardEId;
	user: UserEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserRepositoryEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	repositoryShard?: ShardEOptionalId;
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserRepositoryEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserRepositoryECreate
extends UserRepositoryEId, UserRepositoryEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserRepository extends QShardedRecord
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	repositoryShard: QShardQRelation;
	user: QUserQRelation;

	// Non-Id Fields
	permission: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QUserRepositoryQId extends QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	repositoryShard: QShardQId;
	user: QUserQId;


}

// Entity Relation Interface
export interface QUserRepositoryQRelation
	extends QShardedRecordQRelation<QUserRepository>, QUserRepositoryQId {
}

