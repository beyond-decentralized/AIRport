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
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyArchiveLogESelect
    extends IEntitySelectProperties, DailyArchiveLogEOptionalId {
	// Non-Id Properties
	numberOfChanges?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyArchiveLogEId
    extends IEntityIdProperties {
	// Id Properties
	dateNumber: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DailyArchiveLogEOptionalId {
	// Id Properties
	dateNumber?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyArchiveLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	numberOfChanges?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailyArchiveLogECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyArchiveLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NUMBER_OF_CHANGES?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyArchiveLogECreateProperties
extends Partial<DailyArchiveLogEId>, DailyArchiveLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyArchiveLogECreateColumns
extends DailyArchiveLogEId, DailyArchiveLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyArchiveLog extends IQEntity
{
	// Id Fields
	dateNumber: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;

	// Non-Id Fields
	numberOfChanges: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QDailyArchiveLogQId
{
	
	// Id Fields
	dateNumber: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QDailyArchiveLogQRelation
	extends IQRelation<QDailyArchiveLog>, QDailyArchiveLogQId {
}

