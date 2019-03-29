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
	IImmutableRepoRow,
	ImmutableRepoRowEId,
	ImmutableRepoRowEUpdateColumns,
	ImmutableRepoRowEUpdateProperties,
	ImmutableRepoRowESelect,
	QImmutableRepoRowQId,
	QImmutableRepoRowQRelation,
	QImmutableRepoRow,
} from './qimmutablereporow';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IMutableRepoRow extends IImmutableRepoRow {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	updatedAt?: Date;

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
export interface MutableRepoRowESelect
    extends ImmutableRepoRowESelect, MutableRepoRowEOptionalId {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableRepoRowEId
    extends ImmutableRepoRowEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MutableRepoRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableRepoRowEUpdateProperties
	extends ImmutableRepoRowEUpdateProperties {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableRepoRowEUpdateColumns
	extends ImmutableRepoRowEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableRepoRowECreateProperties
extends Partial<MutableRepoRowEId>, MutableRepoRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableRepoRowECreateColumns
extends MutableRepoRowEId, MutableRepoRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableRepoRow extends QImmutableRepoRow
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	updatedAt: IQDateField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMutableRepoRowQId extends QImmutableRepoRowQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMutableRepoRowQRelation<SubType extends IQEntityInternal>
	extends QImmutableRepoRowQRelation<QMutableRepoRow>, QMutableRepoRowQId {
}

