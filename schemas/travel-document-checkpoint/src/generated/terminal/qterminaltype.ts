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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
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
	ITerminal,
} from './terminal';
import {
	TypeGraph,
	TypeEId,
	TypeEOptionalId,
	TypeEUpdateProperties,
	TypeESelect,
	QType,
	QTypeQId,
	QTypeQRelation,
} from '../type/qtype';
import {
	IType,
} from '../type/type';
import {
	ITerminalType,
} from './terminaltype';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalTypeESelect
    extends IEntitySelectProperties, TerminalTypeEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	terminal?: TerminalESelect;
	type?: TypeESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalTypeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	terminal: TerminalEId;
	type: TypeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalTypeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	terminal?: TerminalEOptionalId;
	type?: TypeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalTypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalTypeGraph
	extends TerminalTypeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	terminal?: TerminalGraph;
	type?: TypeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalTypeECreateProperties
extends Partial<TerminalTypeEId>, TerminalTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalTypeECreateColumns
extends TerminalTypeEId, TerminalTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QTerminalType extends IQEntity
{
	// Id Fields

	// Id Relations
	terminal: QTerminalQRelation;
	type: QTypeQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QTerminalTypeQId
{
	
	// Id Fields

	// Id Relations
	terminal: QTerminalQId;
	type: QTypeQId;


}

// Entity Relation Interface
export interface QTerminalTypeQRelation
	extends IQRelation<QTerminalType>, QTerminalTypeQId {
}

