import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	UserECascadeGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from '../quser';
import {
	SecurityQuestionECascadeGraph,
	SecurityQuestionEId,
	SecurityQuestionEOptionalId,
	SecurityQuestionEUpdateProperties,
	SecurityQuestionESelect,
	QSecurityQuestion,
	QSecurityQuestionQId,
	QSecurityQuestionQRelation,
} from './qsecurityquestion';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SecurityAnswerESelect
    extends IEntitySelectProperties, SecurityAnswerEOptionalId {
	// Non-Id Properties
	answer?: string | IQStringField;

	// Id Relations - full property interfaces
	user?: UserESelect;
	securityQuestion?: SecurityQuestionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SecurityAnswerEId
    extends IEntityIdProperties {
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
export interface SecurityAnswerEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	answer?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SecurityAnswerECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SecurityAnswerEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ANSWER?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SecurityAnswerECreateProperties
extends Partial<SecurityAnswerEId>, SecurityAnswerEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SecurityAnswerECreateColumns
extends SecurityAnswerEId, SecurityAnswerEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityAnswer extends IQEntity
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
export interface QSecurityAnswerQId
{
	
	// Id Fields

	// Id Relations
	user: QUserQId;
	securityQuestion: QSecurityQuestionQId;


}

// Entity Relation Interface
export interface QSecurityAnswerQRelation
	extends IQRelation<QSecurityAnswer>, QSecurityAnswerQId {
}

