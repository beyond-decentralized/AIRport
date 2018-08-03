import {
	IQEntityInternal,
	IEntityIdProperties,
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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IDailyArchiveLog,
	DailyArchiveLogEId,
	DailyArchiveLogEOptionalId,
	DailyArchiveLogEUpdateProperties,
	DailyArchiveLogESelect,
	QDailyArchiveLog,
	QDailyArchiveLogQId,
	QDailyArchiveLogQRelation,
} from '@airport/guideway';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDailyArchive {
	
	// Id Properties

	// Id Relations
	repository?: IRepository;
	dailyArchiveLog?: IDailyArchiveLog;

	// Non-Id Properties
	repositoryData?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyArchiveESelect
    extends IEntitySelectProperties, DailyArchiveEOptionalId, DailyArchiveEUpdateProperties {
	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	dailyArchiveLog?: DailyArchiveLogESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyArchiveEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	dailyArchiveLog: DailyArchiveLogEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DailyArchiveEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	dailyArchiveLog?: DailyArchiveLogEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyArchiveEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	repositoryData?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyArchiveEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	REPOSITORY_DATA?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyArchiveECreateProperties
extends Partial<DailyArchiveEId>, DailyArchiveEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyArchiveECreateColumns
extends DailyArchiveEId, DailyArchiveEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyArchive extends QEntity
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	dailyArchiveLog: QDailyArchiveLogQRelation;

	// Non-Id Fields
	repositoryData: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QDailyArchiveQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	dailyArchiveLog: QDailyArchiveLogQId;


}

// Entity Relation Interface
export interface QDailyArchiveQRelation
	extends QRelation<QDailyArchive>, QDailyArchiveQId {
}

