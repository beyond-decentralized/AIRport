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
	Stageable,
} from '../../ddl/infrastructure/Stageable';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface StageableESelect
    extends IEntitySelectProperties, StageableEOptionalId {
	// Non-Id Properties
	isRepositoryDependencyReference?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface StageableEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface StageableEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface StageableEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	isRepositoryDependencyReference?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface StageableGraph
	extends StageableEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	isRepositoryDependencyReference?: boolean | IQBooleanField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface StageableEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface StageableECreateProperties
extends Partial<StageableEId>, StageableEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface StageableECreateColumns
extends StageableEId, StageableEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QStageable<T> extends IQEntity<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	isRepositoryDependencyReference: IQBooleanField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QStageableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QStageableQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends IQRelation<SubType, SubQType>, QStageableQId {
}

