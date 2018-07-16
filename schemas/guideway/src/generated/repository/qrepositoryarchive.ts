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
} from './qrepository';
import {
	IArchive,
	ArchiveEId,
	ArchiveEOptionalId,
	ArchiveEUpdateProperties,
	ArchiveESelect,
	QArchive,
	QArchiveQId,
	QArchiveQRelation,
} from './qarchive';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryArchive {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties

	// Non-Id Relations
	repository?: IRepository;
	archive?: IArchive;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryArchiveESelect
    extends IEntitySelectProperties, RepositoryArchiveEOptionalId, RepositoryArchiveEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryESelect;
	archive?: ArchiveESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryArchiveEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryArchiveEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryArchiveEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	repository?: RepositoryEOptionalId;
	archive?: ArchiveEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryArchiveEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	REPOSITORY_ID?: number | IQNumberField;
	ARCHIVE_ID?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryArchiveECreateProperties
extends RepositoryArchiveEId, RepositoryArchiveEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryArchiveECreateColumns
extends RepositoryArchiveEId, RepositoryArchiveEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryArchive extends QEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	repository: QRepositoryQRelation;
	archive: QArchiveQRelation;

}


// Entity Id Interface
export interface QRepositoryArchiveQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryArchiveQRelation
	extends QRelation<QRepositoryArchive>, QRepositoryArchiveQId {
}

