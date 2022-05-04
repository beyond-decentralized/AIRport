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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';
import {
	IUser,
} from './user';
import {
	ITerminal,
} from './terminal';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect
    extends IEntitySelectProperties, TerminalEOptionalId {
	// Non-Id Properties
	uuId?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	uuId?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	owner?: UserEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph
	extends TerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	uuId?: string | IQStringField;
	isLocal?: boolean | IQBooleanField;

	// Relations
	owner?: UserGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	UUID?: string | IQStringField;
	IS_LOCAL?: boolean | IQBooleanField;
	OWNER_USER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties
extends Partial<TerminalEId>, TerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns
extends TerminalEId, TerminalEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminal extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	uuId: IQStringField;
	isLocal: IQBooleanField;

	// Non-Id Relations
	owner: QUserQRelation;

}


// Entity Id Interface
export interface QTerminalQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTerminalQRelation
	extends IQRelation<QTerminal>, QTerminalQId {
}

