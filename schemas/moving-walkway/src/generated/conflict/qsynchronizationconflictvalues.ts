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
	SynchronizationConflictGraph,
	SynchronizationConflictEId,
	SynchronizationConflictEOptionalId,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictESelect,
	QSynchronizationConflict,
	QSynchronizationConflictQId,
	QSynchronizationConflictQRelation,
} from './qsynchronizationconflict';
import {
	ISynchronizationConflict,
} from './synchronizationconflict';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictValuesESelect
    extends IEntitySelectProperties, SynchronizationConflictValuesEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	synchronizationConflict?: SynchronizationConflictESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictValuesEId
    extends IEntityIdProperties {
	// Id Properties
	columnIndex: number | IQNumberField;

	// Id Relations - Ids only
	synchronizationConflict: SynchronizationConflictEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictValuesEOptionalId {
	// Id Properties
	columnIndex?: number | IQNumberField;

	// Id Relations - Ids only
	synchronizationConflict?: SynchronizationConflictEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictValuesEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictValuesGraph
	extends SynchronizationConflictValuesEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	synchronizationConflict?: SynchronizationConflictGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictValuesEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictValuesECreateProperties
extends Partial<SynchronizationConflictValuesEId>, SynchronizationConflictValuesEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictValuesECreateColumns
extends SynchronizationConflictValuesEId, SynchronizationConflictValuesEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSynchronizationConflictValues extends IQEntity
{
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	synchronizationConflict: QSynchronizationConflictQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSynchronizationConflictValuesQId
{
	
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	synchronizationConflict: QSynchronizationConflictQId;


}

// Entity Relation Interface
export interface QSynchronizationConflictValuesQRelation
	extends IQRelation<QSynchronizationConflictValues>, QSynchronizationConflictValuesQId {
}

