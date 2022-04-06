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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
	IUser,
} from '@airport/travel-document-checkpoint-internal';
import {
	IImmutableRow,
} from './immutablerow';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRowESelect
    extends IEntitySelectProperties, ImmutableRowEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRowEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRowEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableRowGraph
	extends ImmutableRowEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Relations
	user?: UserGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRowEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRowECreateProperties
extends Partial<ImmutableRowEId>, ImmutableRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRowECreateColumns
extends ImmutableRowEId, ImmutableRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRow extends IQEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;

	// Non-Id Relations
	user: QUserQRelation;

}


// Entity Id Interface
export interface QImmutableRowQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableRowQRelation<SubQType extends IQEntity>
	extends IQRelation<SubQType>, QImmutableRowQId {
}

