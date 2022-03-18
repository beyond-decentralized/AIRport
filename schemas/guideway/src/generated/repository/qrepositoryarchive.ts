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
} from './qrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	ArchiveGraph,
	ArchiveEId,
	ArchiveEOptionalId,
	ArchiveEUpdateProperties,
	ArchiveESelect,
	QArchive,
	QArchiveQId,
	QArchiveQRelation,
} from './qarchive';
import {
	Archive,
} from '../../ddl/repository/Archive';
import {
	RepositoryArchive,
} from '../../ddl/repository/RepositoryArchive';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryArchiveESelect
    extends IEntitySelectProperties, RepositoryArchiveEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	archive?: ArchiveESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryArchiveEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	archive: ArchiveEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryArchiveEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	archive?: ArchiveEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryArchiveEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryArchiveGraph
	extends RepositoryArchiveEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	archive?: ArchiveGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryArchiveEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryArchiveECreateProperties
extends Partial<RepositoryArchiveEId>, RepositoryArchiveEUpdateProperties {
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
export interface QRepositoryArchive extends IQEntity<RepositoryArchive>
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	archive: QArchiveQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepositoryArchiveQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	archive: QArchiveQId;


}

// Entity Relation Interface
export interface QRepositoryArchiveQRelation
	extends IQRelation<RepositoryArchive, QRepositoryArchive>, QRepositoryArchiveQId {
}

