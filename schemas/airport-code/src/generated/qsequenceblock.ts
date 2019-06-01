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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISequenceBlock {
	
	// Id Properties
	id?: number;

	// Id Relations
	sequenceConsumer?: ISequenceConsumer;

	// Non-Id Properties
	size?: number;
	lastReservedId?: number;
	reservationMillis?: number;

	// Non-Id Relations
	sequence?: ISequence;

	// Transient Properties
	currentNumber?: number;

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceBlockESelect
    extends IEntitySelectProperties, SequenceBlockEOptionalId {
	// Non-Id Properties
	size?: number | IQNumberField;
	lastReservedId?: number | IQNumberField;
	reservationMillis?: number | IQNumberField;

	// Id Relations - full property interfaces
	sequenceConsumer?: SequenceConsumerESelect;

  // Non-Id relations (including OneToMany's)
	sequence?: SequenceESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	sequenceConsumer: SequenceConsumerEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	sequenceConsumer?: SequenceConsumerEOptionalId;

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
	sequence?: SequenceEOptionalId;

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
	SCHEMA_INDEX?: number | IQNumberField;
	TABLE_INDEX?: number | IQNumberField;
	COLUMN_INDEX?: number | IQNumberField;

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
export interface QSequenceBlock extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	sequenceConsumer: QSequenceConsumerQRelation;

	// Non-Id Fields
	size: IQNumberField;
	lastReservedId: IQNumberField;
	reservationMillis: IQNumberField;

	// Non-Id Relations
	sequence: QSequenceQRelation;

}


// Entity Id Interface
export interface QSequenceBlockQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	sequenceConsumer: QSequenceConsumerQId;


}

// Entity Relation Interface
export interface QSequenceBlockQRelation
	extends IQRelation<QSequenceBlock>, QSequenceBlockQId {
}

