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
	TerminalAgtECascadeGraph,
	TerminalAgtEId,
	TerminalAgtEOptionalId,
	TerminalAgtEUpdateProperties,
	TerminalAgtESelect,
	QTerminalAgt,
	QTerminalAgtQId,
	QTerminalAgtQRelation,
} from './qterminalagt';
import {
	UserTerminalAgtECascadeGraph,
	UserTerminalAgtEId,
	UserTerminalAgtEOptionalId,
	UserTerminalAgtEUpdateProperties,
	UserTerminalAgtESelect,
	QUserTerminalAgt,
	QUserTerminalAgtQId,
	QUserTerminalAgtQRelation,
} from './quserterminalagt';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtESelect
    extends IEntitySelectProperties, AgtEOptionalId {
	// Non-Id Properties
	address?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	terminalAgts?: TerminalAgtESelect;
	userTerminalAgts?: UserTerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface AgtEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	address?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgtECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations
	terminalAgts?: TerminalAgtECascadeGraph;
	userTerminalAgts?: UserTerminalAgtECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ADDRESS?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtECreateProperties
extends Partial<AgtEId>, AgtEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtECreateColumns
extends AgtEId, AgtEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgt extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	address: IQStringField;

	// Non-Id Relations
	terminalAgts: IQOneToManyRelation<QTerminalAgt>;
	userTerminalAgts: IQOneToManyRelation<QUserTerminalAgt>;

}


// Entity Id Interface
export interface QAgtQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QAgtQRelation
	extends IQRelation<QAgt>, QAgtQId {
}

