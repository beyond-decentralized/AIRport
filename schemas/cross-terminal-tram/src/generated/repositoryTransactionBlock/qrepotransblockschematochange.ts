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
	RepositoryTransactionBlockGraph,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockEOptionalId,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockESelect,
	QRepositoryTransactionBlock,
	QRepositoryTransactionBlockQId,
	QRepositoryTransactionBlockQRelation,
} from './qrepositorytransactionblock';
import {
	RepositoryTransactionBlock,
} from '../../ddl/repositoryTransactionBlock/RepositoryTransactionBlock';
import {
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
	Application,
} from '@airport/traffic-pattern';
import {
	RepoTransBlockApplicationToChange,
} from '../../ddl/repositoryTransactionBlock/RepoTransBlockApplicationToChange';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockApplicationToChangeESelect
    extends IEntitySelectProperties, RepoTransBlockApplicationToChangeEOptionalId {
	// Non-Id Properties
	status?: string | IQStringField;

	// Id Relations - full property interfaces
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
	application?: ApplicationESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockApplicationToChangeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock: RepositoryTransactionBlockEId;
	application: ApplicationEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockApplicationToChangeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
	application?: ApplicationEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockApplicationToChangeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	status?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransBlockApplicationToChangeGraph
	extends RepoTransBlockApplicationToChangeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	status?: string | IQStringField;

	// Relations
	repositoryTransactionBlock?: RepositoryTransactionBlockGraph;
	application?: ApplicationGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockApplicationToChangeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	STATUS?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockApplicationToChangeECreateProperties
extends Partial<RepoTransBlockApplicationToChangeEId>, RepoTransBlockApplicationToChangeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockApplicationToChangeECreateColumns
extends RepoTransBlockApplicationToChangeEId, RepoTransBlockApplicationToChangeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockApplicationToChange extends IQEntity<RepoTransBlockApplicationToChange>
{
	// Id Fields

	// Id Relations
	repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
	application: QApplicationQRelation;

	// Non-Id Fields
	status: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepoTransBlockApplicationToChangeQId
{
	
	// Id Fields

	// Id Relations
	repositoryTransactionBlock: QRepositoryTransactionBlockQId;
	application: QApplicationQId;


}

// Entity Relation Interface
export interface QRepoTransBlockApplicationToChangeQRelation
	extends IQRelation<RepoTransBlockApplicationToChange, QRepoTransBlockApplicationToChange>, QRepoTransBlockApplicationToChangeQId {
}

