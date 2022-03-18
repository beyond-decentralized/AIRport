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
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	MonthlyArchiveLog,
} from '../../ddl/archive/MonthlyArchiveLog';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlyArchiveLogESelect
    extends IEntitySelectProperties, MonthlyArchiveLogEOptionalId {
	// Non-Id Properties
	numberOfChanges?: number | IQNumberField;
	daysWithChanges?: any | IQUntypedField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlyArchiveLogEId
    extends IEntityIdProperties {
	// Id Properties
	monthNumber: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface MonthlyArchiveLogEOptionalId {
	// Id Properties
	monthNumber?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlyArchiveLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	numberOfChanges?: number | IQNumberField;
	daysWithChanges?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlyArchiveLogGraph
	extends MonthlyArchiveLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	numberOfChanges?: number | IQNumberField;
	daysWithChanges?: any | IQUntypedField;

	// Relations
	repository?: RepositoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlyArchiveLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NUMBER_OF_CHANGES?: number | IQNumberField;
	DAYS_WITH_CHANGES?: any | IQUntypedField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlyArchiveLogECreateProperties
extends Partial<MonthlyArchiveLogEId>, MonthlyArchiveLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlyArchiveLogECreateColumns
extends MonthlyArchiveLogEId, MonthlyArchiveLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlyArchiveLog extends IQEntity<MonthlyArchiveLog>
{
	// Id Fields
	monthNumber: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;

	// Non-Id Fields
	numberOfChanges: IQNumberField;
	daysWithChanges: IQUntypedField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMonthlyArchiveLogQId
{
	
	// Id Fields
	monthNumber: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QMonthlyArchiveLogQRelation
	extends IQRelation<MonthlyArchiveLog, QMonthlyArchiveLog>, QMonthlyArchiveLogQId {
}

