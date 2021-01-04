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
	DailySyncLog,
} from '../ddl/DailySyncLog';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DailySyncLogESelect
    extends IEntitySelectProperties, DailySyncLogEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailySyncLogEId
    extends IEntityIdProperties {
	// Id Properties
	databaseId: number | IQNumberField;
	date: number | IQNumberField;
	repositoryId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DailySyncLogEOptionalId {
	// Id Properties
	databaseId?: number | IQNumberField;
	date?: number | IQNumberField;
	repositoryId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailySyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailySyncLogGraph
	extends DailySyncLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DailySyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailySyncLogECreateProperties
extends Partial<DailySyncLogEId>, DailySyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailySyncLogECreateColumns
extends DailySyncLogEId, DailySyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailySyncLog extends IQEntity<DailySyncLog>
{
	// Id Fields
	databaseId: IQNumberField;
	date: IQNumberField;
	repositoryId: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QDailySyncLogQId
{
	
	// Id Fields
	databaseId: IQNumberField;
	date: IQNumberField;
	repositoryId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDailySyncLogQRelation
	extends IQRelation<DailySyncLog, QDailySyncLog>, QDailySyncLogQId {
}

