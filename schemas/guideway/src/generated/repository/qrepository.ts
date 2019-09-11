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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ITerminalRepository,
	TerminalRepositoryEId,
	TerminalRepositoryEOptionalId,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryESelect,
	QTerminalRepository,
	QTerminalRepositoryQId,
	QTerminalRepositoryQRelation,
} from '../terminal/qterminalrepository';
import {
	IAgtRepositoryTransactionBlock,
	AgtRepositoryTransactionBlockEId,
	AgtRepositoryTransactionBlockEOptionalId,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockESelect,
	QAgtRepositoryTransactionBlock,
	QAgtRepositoryTransactionBlockQId,
	QAgtRepositoryTransactionBlockQRelation,
} from '../synchronization/qagtrepositorytransactionblock';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	lastUpdateTime?: Date;
	name?: string;
	status?: number;

	// Non-Id Relations
	terminalRepositories?: ITerminalRepository[];
	repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];

	// Transient Properties

	// Public Methods
	
}		
		
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
	status?: number | IQNumberField;

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
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LAST_UPDATE_DATETIME?: Date | IQDateField;
	NAME?: string | IQStringField;
	STATUS?: number | IQNumberField;

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
export interface QRepository extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	lastUpdateTime: IQDateField;
	name: IQStringField;
	status: IQNumberField;

	// Non-Id Relations
	terminalRepositories: IQOneToManyRelation<QTerminalRepository>;
	repositoryTransactionBlocks: IQOneToManyRelation<QAgtRepositoryTransactionBlock>;

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
	extends IQRelation<QRepository>, QRepositoryQId {
}

