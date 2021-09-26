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
	TerminalRepositoryGraph,
	TerminalRepositoryEId,
	TerminalRepositoryEOptionalId,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryESelect,
	QTerminalRepository,
	QTerminalRepositoryQId,
	QTerminalRepositoryQRelation,
} from '../terminal/qterminalrepository';
import {
	TerminalRepository,
} from '../../ddl/terminal/TerminalRepository';
import {
	AgtRepositoryTransactionBlockGraph,
	AgtRepositoryTransactionBlockEId,
	AgtRepositoryTransactionBlockEOptionalId,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockESelect,
	QAgtRepositoryTransactionBlock,
	QAgtRepositoryTransactionBlockQId,
	QAgtRepositoryTransactionBlockQRelation,
} from '../synchronization/qagtrepositorytransactionblock';
import {
	AgtRepositoryTransactionBlock,
} from '../../ddl/synchronization/AgtRepositoryTransactionBlock';
import {
	Repository,
} from '../../ddl/repository/Repository';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends IEntitySelectProperties, RepositoryEOptionalId {
	// Non-Id Properties
	lastUpdateTime?: Date | IQDateField;
	name?: string | IQStringField;
	status?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	terminalRepositories?: TerminalRepositoryESelect;
	repositoryTransactionBlocks?: AgtRepositoryTransactionBlockESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	lastUpdateTime?: Date | IQDateField;
	name?: string | IQStringField;
	status?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph
	extends RepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	lastUpdateTime?: Date | IQDateField;
	name?: string | IQStringField;
	status?: string | IQStringField;

	// Relations
	terminalRepositories?: TerminalRepositoryGraph[];
	repositoryTransactionBlocks?: AgtRepositoryTransactionBlockGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LAST_UPDATE_DATETIME?: Date | IQDateField;
	NAME?: string | IQStringField;
	STATUS?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties
extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns
extends RepositoryEId, RepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity<Repository>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	lastUpdateTime: IQDateField;
	name: IQStringField;
	status: IQStringField;

	// Non-Id Relations
	terminalRepositories: IQOneToManyRelation<TerminalRepository, QTerminalRepository>;
	repositoryTransactionBlocks: IQOneToManyRelation<AgtRepositoryTransactionBlock, QAgtRepositoryTransactionBlock>;

}


// Entity Id Interface
export interface QRepositoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends IQRelation<Repository, QRepository>, QRepositoryQId {
}

