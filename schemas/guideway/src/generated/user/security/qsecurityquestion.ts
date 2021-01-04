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
	SecurityQuestion,
} from '../../../ddl/user/security/SecurityQuestion';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SecurityQuestionESelect
    extends IEntitySelectProperties, SecurityQuestionEOptionalId {
	// Non-Id Properties
	question?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SecurityQuestionEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SecurityQuestionEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SecurityQuestionEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	question?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SecurityQuestionGraph
	extends SecurityQuestionEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	question?: string | IQStringField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SecurityQuestionEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	QUESTION?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SecurityQuestionECreateProperties
extends Partial<SecurityQuestionEId>, SecurityQuestionEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SecurityQuestionECreateColumns
extends SecurityQuestionEId, SecurityQuestionEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSecurityQuestion extends IQEntity<SecurityQuestion>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	question: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSecurityQuestionQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSecurityQuestionQRelation
	extends IQRelation<SecurityQuestion, QSecurityQuestion>, QSecurityQuestionQId {
}

