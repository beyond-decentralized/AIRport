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
} from '../../qshardedrecord';
import {
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdate,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from '../quser';
import {
	ISecurityQuestion,
	SecurityQuestionEId,
	SecurityQuestionEOptionalId,
	SecurityQuestionEUpdate,
	SecurityQuestionESelect,
	QSecurityQuestion,
	QSecurityQuestionQId,
	QSecurityQuestionQRelation,
} from './qsecurityquestion';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISecurityAnswer extends IShardedRecord {
	
	// Id Properties

	// Id Relations
	user?: IUser;
	securityQuestion?: ISecurityQuestion;

	// Non-Id Properties
	answer?: string;

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
export interface SecurityAnswerESelect
    extends ShardedRecordESelect, SecurityAnswerEOptionalId, SecurityAnswerEUpdate {
	// Id Relations - full property interfaces
	user?: UserESelect;
	securityQuestion?: SecurityQuestionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SecurityAnswerEId
    extends ShardedRecordEId {
	// Id Properties

	// Id Relations - Ids only
	user: UserEId;
	securityQuestion: SecurityQuestionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SecurityAnswerEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	user?: UserEOptionalId;
	securityQuestion?: SecurityQuestionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SecurityAnswerEUpdate
	extends ShardedRecordEUpdate {
	// Non-Id Properties
	answer?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SecurityAnswerECreate
extends SecurityAnswerEId, SecurityAnswerEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityAnswer extends QShardedRecord
{
	// Id Fields

	// Id Relations
	user: QUserQRelation;
	securityQuestion: QSecurityQuestionQRelation;

	// Non-Id Fields
	answer: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSecurityAnswerQId extends QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	user: QUserQId;
	securityQuestion: QSecurityQuestionQId;


}

// Entity Relation Interface
export interface QSecurityAnswerQRelation
	extends QShardedRecordQRelation<QSecurityAnswer>, QSecurityAnswerQId {
}

