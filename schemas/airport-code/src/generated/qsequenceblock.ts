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
	reservationMillis?: number;

	// Id Relations
	sequence?: ISequence;

	// Non-Id Properties
	size?: number;
	lastReservedId?: number;

	// Non-Id Relations

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

	// Id Relations - full property interfaces
	sequence?: SequenceESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceBlockEId
    extends IEntityIdProperties {
	// Id Properties
	reservationMillis: number | IQNumberField;

	// Id Relations - Ids only
	sequence: SequenceEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceBlockEOptionalId {
	// Id Properties
	reservationMillis?: number | IQNumberField;

	// Id Relations - Ids only
	sequence?: SequenceEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceBlockEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	size?: number | IQNumberField;
	lastReservedId?: number | IQNumberField;

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
	reservationMillis: IQNumberField;

	// Id Relations
	sequence: QSequenceQRelation;

	// Non-Id Fields
	size: IQNumberField;
	lastReservedId: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSequenceBlockQId
{
	
	// Id Fields
	reservationMillis: IQNumberField;

	// Id Relations
	sequence: QSequenceQId;


}

// Entity Relation Interface
export interface QSequenceBlockQRelation
	extends IQRelation<QSequenceBlock>, QSequenceBlockQId {
}

