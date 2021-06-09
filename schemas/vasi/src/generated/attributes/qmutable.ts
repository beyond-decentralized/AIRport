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
	ImmutableGraph,
	ImmutableEId,
	ImmutableEUpdateColumns,
	ImmutableEUpdateProperties,
	ImmutableESelect,
	QImmutableQId,
	QImmutableQRelation,
	QImmutable,
} from './qimmutable';
import {
	Mutable,
} from '../../ddl/attributes/Mutable';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableESelect
    extends ImmutableESelect, MutableEOptionalId {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableEId
    extends ImmutableEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MutableEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableEUpdateProperties
	extends ImmutableEUpdateProperties {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableGraph
	extends MutableEOptionalId, ImmutableGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableEUpdateColumns
	extends ImmutableEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableECreateProperties
extends Partial<MutableEId>, MutableEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableECreateColumns
extends MutableEId, MutableEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutable<T> extends QImmutable<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	updatedAt: IQDateField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMutableQId extends QImmutableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMutableQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QImmutableQRelation<SubType, SubQType>, QMutableQId {
}

