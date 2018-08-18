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
	ISequence,
	SequenceEId,
	SequenceEOptionalId,
	SequenceEUpdateProperties,
	SequenceESelect,
	QSequence,
	QSequenceQId,
	QSequenceQRelation,
} from './qsequence';
import {
	ISequenceConsumer,
	SequenceConsumerEId,
	SequenceConsumerEOptionalId,
	SequenceConsumerEUpdateProperties,
	SequenceConsumerESelect,
	QSequenceConsumer,
	QSequenceConsumerQId,
	QSequenceConsumerQRelation,
} from './qsequenceconsumer';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISequenceBlock {
	
	// Id Properties

	// Id Relations
	sequence?: ISequence;
	consumer?: ISequenceConsumer;

	// Non-Id Properties
	size?: number;
	lastReservedId?: number;
	reservationMillis?: number;

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
export interface SequenceBlockESelect
    extends IEntitySelectProperties, SequenceBlockEOptionalId, SequenceBlockEUpdateProperties {
	// Id Relations - full property interfaces
	sequence?: SequenceESelect;
	consumer?: SequenceConsumerESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sequence: SequenceEId;
	consumer: SequenceConsumerEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sequence?: SequenceEOptionalId;
	consumer?: SequenceConsumerEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	size?: number | IQNumberField;
	lastReservedId?: number | IQNumberField;
	reservationMillis?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceBlockEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SIZE?: number | IQNumberField;
	LAST_RESERVED_ID?: number | IQNumberField;
	RESERVATION_MILLIS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceBlockECreateProperties
extends Partial<SequenceBlockEId>, SequenceBlockEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceBlockECreateColumns
extends SequenceBlockEId, SequenceBlockEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequenceBlock extends QEntity
{
	// Id Fields

	// Id Relations
	sequence: QSequenceQRelation;
	consumer: QSequenceConsumerQRelation;

	// Non-Id Fields
	size: IQNumberField;
	lastReservedId: IQNumberField;
	reservationMillis: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSequenceBlockQId
{
	
	// Id Fields

	// Id Relations
	sequence: QSequenceQId;
	consumer: QSequenceConsumerQId;


}

// Entity Relation Interface
export interface QSequenceBlockQRelation
	extends QRelation<QSequenceBlock>, QSequenceBlockQId {
}

