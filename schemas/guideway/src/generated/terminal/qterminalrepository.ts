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
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from './qterminal';
import {
	Terminal,
} from '../../ddl/terminal/Terminal';
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
	TerminalRepository,
} from '../../ddl/terminal/TerminalRepository';


declare function require(moduleName: string): any;


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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalRepositoryGraph
	extends TerminalRepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Relations
	terminal?: TerminalGraph;
	repository?: RepositoryGraph;

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
export interface QTerminalRepository extends IQEntity<TerminalRepository>
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
	extends IQRelation<TerminalRepository, QTerminalRepository>, QTerminalRepositoryQId {
}

