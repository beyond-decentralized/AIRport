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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITuningParameters {
	
	// Id Properties
	parameterGroup?: string;
	parameterName?: string;

	// Id Relations

	// Non-Id Properties
	parameterValue?: string;

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
export interface TuningParametersESelect
    extends IEntitySelectProperties, TuningParametersEOptionalId, TuningParametersEUpdate {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TuningParametersEId
    extends IEntityIdProperties {
	// Id Properties
	parameterGroup: string | IQStringField;
	parameterName: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TuningParametersEOptionalId {
	// Id Properties
	parameterGroup?: string | IQStringField;
	parameterName?: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TuningParametersEUpdate
	extends IEntityUpdateProperties {
	// Non-Id Properties
	parameterValue?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TuningParametersECreate
extends TuningParametersEId, TuningParametersEUpdate {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTuningParameters extends QEntity
{
	// Id Fields
	parameterGroup: IQStringField;
	parameterName: IQStringField;

	// Id Relations

	// Non-Id Fields
	parameterValue: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QTuningParametersQId
{
	
	// Id Fields
	parameterGroup: IQStringField;
	parameterName: IQStringField;

	// Id Relations


}

// Entity Relation Interface
export interface QTuningParametersQRelation extends QRelation<QTuningParameters>, QTuningParametersQId {
}

