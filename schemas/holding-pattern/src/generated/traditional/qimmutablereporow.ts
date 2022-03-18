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
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	RepositoryEntityGraph,
	RepositoryEntityEId,
	RepositoryEntityEUpdateColumns,
	RepositoryEntityEUpdateProperties,
	RepositoryEntityESelect,
	QRepositoryEntityQId,
	QRepositoryEntityQRelation,
	QRepositoryEntity,
} from '../repository/qrepositoryentity';
import {
	ImmutableRepoRow,
} from '../../ddl/traditional/ImmutableRepoRow';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRepoRowESelect
    extends RepositoryEntityESelect, ImmutableRepoRowEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRepoRowEId
    extends RepositoryEntityEId {
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
	extends RepositoryEntityEUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableRepoRowGraph
	extends ImmutableRepoRowEOptionalId, RepositoryEntityGraph {
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
	extends RepositoryEntityEUpdateColumns {
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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRepoRow<T> extends QRepositoryEntity<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QImmutableRepoRowQId extends QRepositoryEntityQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableRepoRowQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QRepositoryEntityQRelation<SubType, SubQType>, QImmutableRepoRowQId {
}

