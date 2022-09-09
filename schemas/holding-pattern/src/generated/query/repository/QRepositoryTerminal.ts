import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './QRepository';
import {
	IRepository,
} from '../../entity/repository/IRepository';
import {
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
	ITerminal,
} from '@airport/travel-document-checkpoint';
import {
	IRepositoryTerminal,
} from '../../entity/repository/IRepositoryTerminal';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTerminalESelect
    extends IEntitySelectProperties, RepositoryTerminalEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTerminalEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTerminalEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTerminalGraph
	extends RepositoryTerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTerminalECreateProperties
extends Partial<RepositoryTerminalEId>, RepositoryTerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTerminalECreateColumns
extends RepositoryTerminalEId, RepositoryTerminalEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryTerminal<IQE extends QRepositoryTerminal = any> extends IQEntity<IQE | QRepositoryTerminal>
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QRepositoryTerminalQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QRepositoryTerminalQRelation
	extends IQRelation<QRepositoryTerminal>, QRepositoryTerminalQId {
}