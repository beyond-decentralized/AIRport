import {
	IQEntityInternal,
	IEntityIdProperties,
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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITuningParameters {
	
	// Id Properties
	serverType: string;
	parameterGroup: string;
	parameterName: string;

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
    extends IEntitySelectProperties, TuningParametersEOptionalId {
	// Non-Id Properties
	parameterValue?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TuningParametersEId
    extends IEntityIdProperties {
	// Id Properties
	serverType: string | IQStringField;
	parameterGroup: string | IQStringField;
	parameterName: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TuningParametersEOptionalId {
	// Id Properties
	serverType?: string | IQStringField;
	parameterGroup?: string | IQStringField;
	parameterName?: string | IQStringField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TuningParametersEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	parameterValue?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TuningParametersEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PARAMETER_VALUE?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TuningParametersECreateProperties
extends Partial<TuningParametersEId>, TuningParametersEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TuningParametersECreateColumns
extends TuningParametersEId, TuningParametersEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTuningParameters extends IQEntity
{
	// Id Fields
	serverType: IQStringField;
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
	serverType: IQStringField;
	parameterGroup: IQStringField;
	parameterName: IQStringField;

	// Id Relations


}

// Entity Relation Interface
export interface QTuningParametersQRelation
	extends IQRelation<QTuningParameters>, QTuningParametersQId {
}

