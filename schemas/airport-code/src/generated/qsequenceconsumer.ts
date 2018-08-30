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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IDomain,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
} from '@airport/territory';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISequenceConsumer {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	createTimestamp?: number;
	randomNumber?: number;

	// Non-Id Relations
	domain?: IDomain;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceConsumerESelect
    extends IEntitySelectProperties, SequenceConsumerEOptionalId {
	// Non-Id Properties
	createTimestamp?: number | IQNumberField;
	randomNumber?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceConsumerEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceConsumerEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceConsumerEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	createTimestamp?: number | IQNumberField;
	randomNumber?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	domain?: DomainEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceConsumerEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	CREATE_TIMESTAMP?: number | IQNumberField;
	RANDOM_NUMBER?: number | IQNumberField;
	DOMAIN_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceConsumerECreateProperties
extends Partial<SequenceConsumerEId>, SequenceConsumerEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceConsumerECreateColumns
extends SequenceConsumerEId, SequenceConsumerEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequenceConsumer extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	createTimestamp: IQNumberField;
	randomNumber: IQNumberField;

	// Non-Id Relations
	domain: QDomainQRelation;

}


// Entity Id Interface
export interface QSequenceConsumerQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSequenceConsumerQRelation
	extends QRelation<QSequenceConsumer>, QSequenceConsumerQId {
}

