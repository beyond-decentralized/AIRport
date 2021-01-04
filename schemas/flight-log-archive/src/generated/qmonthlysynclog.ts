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
	MonthlySyncLog,
} from '../ddl/MonthlySyncLog';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlySyncLogESelect
    extends IEntitySelectProperties, MonthlySyncLogEOptionalId {
	// Non-Id Properties
	synced?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlySyncLogEId
    extends IEntityIdProperties {
	// Id Properties
	databaseId: number | IQNumberField;
	month: Date | IQDateField;
	repositoryId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MonthlySyncLogEOptionalId {
	// Id Properties
	databaseId?: number | IQNumberField;
	month?: Date | IQDateField;
	repositoryId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlySyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	synced?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlySyncLogGraph
	extends MonthlySyncLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	synced?: boolean | IQBooleanField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlySyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SYNCED?: boolean | IQBooleanField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlySyncLogECreateProperties
extends Partial<MonthlySyncLogEId>, MonthlySyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlySyncLogECreateColumns
extends MonthlySyncLogEId, MonthlySyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlySyncLog extends IQEntity<MonthlySyncLog>
{
	// Id Fields
	databaseId: IQNumberField;
	month: IQDateField;
	repositoryId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	synced: IQBooleanField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMonthlySyncLogQId
{
	
	// Id Fields
	databaseId: IQNumberField;
	month: IQDateField;
	repositoryId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QMonthlySyncLogQRelation
	extends IQRelation<MonthlySyncLog, QMonthlySyncLog>, QMonthlySyncLogQId {
}

