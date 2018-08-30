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
	ITerminal,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from './qterminal';
import {
	IRepository,
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
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalRepository {
	
	// Id Properties

	// Id Relations
	terminal?: ITerminal;
	repository?: IRepository;

	// Non-Id Properties
	permission?: number;

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
export interface TerminalRepositoryESelect
    extends IEntitySelectProperties, TerminalRepositoryEOptionalId {
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Id Relations - full property interfaces
	terminal?: TerminalESelect;
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalRepositoryEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	terminal: TerminalEId;
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalRepositoryEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	terminal?: TerminalEOptionalId;
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalRepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalRepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PERMISSION?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalRepositoryECreateProperties
extends Partial<TerminalRepositoryEId>, TerminalRepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalRepositoryECreateColumns
extends TerminalRepositoryEId, TerminalRepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalRepository extends QEntity
{
	// Id Fields

	// Id Relations
	terminal: QTerminalQRelation;
	repository: QRepositoryQRelation;

	// Non-Id Fields
	permission: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QTerminalRepositoryQId
{
	
	// Id Fields

	// Id Relations
	terminal: QTerminalQId;
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QTerminalRepositoryQRelation
	extends QRelation<QTerminalRepository>, QTerminalRepositoryQId {
}

