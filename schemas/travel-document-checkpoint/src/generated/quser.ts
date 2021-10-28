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
	CountryGraph,
	CountryEId,
	CountryEOptionalId,
	CountryEUpdateProperties,
	CountryESelect,
	QCountry,
	QCountryQId,
	QCountryQRelation,
} from './qcountry';
import {
	Country,
} from '../ddl/Country';
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
	UserTerminal,
} from '../ddl/UserTerminal';
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
import {
	UserTerminalAgt,
} from '../ddl/UserTerminalAgt';
import {
	User,
} from '../ddl/User';


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
	privateId?: string | IQStringField;
	publicId?: string | IQStringField;
	email?: string | IQStringField;
	username?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	country?: CountryESelect;
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
	privateId?: string | IQStringField;
	publicId?: string | IQStringField;
	email?: string | IQStringField;
	username?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	country?: CountryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph
	extends UserEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	privateId?: string | IQStringField;
	publicId?: string | IQStringField;
	email?: string | IQStringField;
	username?: string | IQStringField;

	// Relations
	country?: CountryGraph;
	userTerminal?: UserTerminalGraph[];
	userTerminalAgts?: UserTerminalAgtGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PRIVATE_ID?: string | IQStringField;
	PUBLIC_ID?: string | IQStringField;
	USERNAME?: string | IQStringField;
	EMAIL?: string | IQStringField;
	COUNTRY_ID?: number | IQNumberField;

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
export interface QUser extends IQEntity<User>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	privateId: IQStringField;
	publicId: IQStringField;
	email: IQStringField;
	username: IQStringField;

	// Non-Id Relations
	country: QCountryQRelation;
	userTerminal: IQOneToManyRelation<UserTerminal, QUserTerminal>;
	userTerminalAgts: IQOneToManyRelation<UserTerminalAgt, QUserTerminalAgt>;

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
	extends IQRelation<User, QUser>, QUserQId {
}

