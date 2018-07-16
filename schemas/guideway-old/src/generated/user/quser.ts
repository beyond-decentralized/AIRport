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
	ISecurityAnswer,
	SecurityAnswerEId,
	SecurityAnswerEOptionalId,
	SecurityAnswerEUpdate,
	SecurityAnswerESelect,
	QSecurityAnswer,
	QSecurityAnswerQId,
	QSecurityAnswerQRelation,
} from './security/qsecurityanswer';
import {
	IUserRepository,
	UserRepositoryEId,
	UserRepositoryEOptionalId,
	UserRepositoryEUpdate,
	UserRepositoryESelect,
	QUserRepository,
	QUserRepositoryQId,
	QUserRepositoryQRelation,
} from './quserrepository';
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
	ISyncRecord,
	SyncRecordEId,
	SyncRecordEOptionalId,
	SyncRecordEUpdate,
	SyncRecordESelect,
	QSyncRecord,
	QSyncRecordQId,
	QSyncRecordQRelation,
} from '../syncronization/qsyncrecord';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUser extends IShardedRecord {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	hash?: string;
	email?: string;
	isInvitation?: boolean;

	// Non-Id Relations
	securityAnswers?: ISecurityAnswer[];
	userRepositories?: IUserRepository[];
	databases?: IDatabase[];
	syncRecords?: ISyncRecord[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect
    extends ShardedRecordESelect, UserEOptionalId, UserEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	securityAnswers?: SecurityAnswerESelect;
	userRepositories?: UserRepositoryESelect;
	databases?: DatabaseESelect;
	syncRecords?: SyncRecordESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId
    extends ShardedRecordEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	hash?: string | IQStringField;
	email?: string | IQStringField;
	isInvitation?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserECreate
extends UserEId, UserEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUser extends QShardedRecord
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	hash: IQStringField;
	email: IQStringField;
	isInvitation: IQBooleanField;

	// Non-Id Relations
	securityAnswers: IQOneToManyRelation<QSecurityAnswer>;
	userRepositories: IQOneToManyRelation<QUserRepository>;
	databases: IQOneToManyRelation<QDatabase>;
	syncRecords: IQOneToManyRelation<QSyncRecord>;

}


// Entity Id Interface
export interface QUserQId extends QShardedRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QUserQRelation
	extends QShardedRecordQRelation<QUser>, QUserQId {
}

