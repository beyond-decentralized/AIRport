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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	AirEntityGraph,
	AirEntityEId,
	AirEntityEUpdateColumns,
	AirEntityEUpdateProperties,
	AirEntityESelect,
	QAirEntityQId,
	QAirEntityQRelation,
	QAirEntity,
} from '../repository/qairentity';
import {
	IImmutableRepoRow,
} from './immutablereporow';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRepoRowESelect
    extends AirEntityESelect, ImmutableRepoRowEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRepoRowEId
    extends AirEntityEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRepoRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRepoRowEUpdateProperties
	extends AirEntityEUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableRepoRowGraph
	extends ImmutableRepoRowEOptionalId, AirEntityGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRepoRowEUpdateColumns
	extends AirEntityEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRepoRowECreateProperties
extends Partial<ImmutableRepoRowEId>, ImmutableRepoRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRepoRowECreateColumns
extends ImmutableRepoRowEId, ImmutableRepoRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QImmutableRepoRow extends QAirEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QImmutableRepoRowQId extends QAirEntityQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableRepoRowQRelation<SubType, SubQType extends IQEntity>
	extends QAirEntityQRelation<SubType, SubQType>, QImmutableRepoRowQId {
}

