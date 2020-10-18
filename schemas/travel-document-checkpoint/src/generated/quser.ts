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
	UserTerminalGraph,
	UserTerminalEId,
	UserTerminalEOptionalId,
	UserTerminalEUpdateProperties,
	UserTerminalESelect,
	QUserTerminal,
	QUserTerminalQId,
	QUserTerminalQRelation,
} from './quserterminal';
import {
	UserTerminalAgtGraph,
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
export interface UserESelect
    extends IEntitySelectProperties, UserEOptionalId {
	// Non-Id Properties
	uniqueId?: string | IQStringField;
	firstName?: string | IQStringField;
	lastName?: string | IQStringField;
	middleName?: string | IQStringField;
	phone?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	userTerminal?: UserTerminalESelect;
	userTerminalAgts?: UserTerminalAgtESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	uniqueId?: string | IQStringField;
	firstName?: string | IQStringField;
	lastName?: string | IQStringField;
	middleName?: string | IQStringField;
	phone?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph
	extends UserEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	uniqueId?: string | IQStringField;
	firstName?: string | IQStringField;
	lastName?: string | IQStringField;
	middleName?: string | IQStringField;
	phone?: string | IQStringField;

	// Relations
	userTerminal?: UserTerminalGraph[];
	userTerminalAgts?: UserTerminalAgtGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	UNIQUE_IDENTIFIER?: string | IQStringField;
	FIRST_NAME?: string | IQStringField;
	LAST_NAME?: string | IQStringField;
	MIDDLE_NAME?: string | IQStringField;
	PHONE?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserECreateProperties
extends Partial<UserEId>, UserEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserECreateColumns
extends UserEId, UserEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUser extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	uniqueId: IQStringField;
	firstName: IQStringField;
	lastName: IQStringField;
	middleName: IQStringField;
	phone: IQStringField;

	// Non-Id Relations
	userTerminal: IQOneToManyRelation<QUserTerminal>;
	userTerminalAgts: IQOneToManyRelation<QUserTerminalAgt>;

}


// Entity Id Interface
export interface QUserQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QUserQRelation
	extends IQRelation<QUser>, QUserQId {
}

