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
	IUser,
} from './user';


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
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;
	uuId?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

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
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;
	uuId?: string | IQStringField;

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
	email?: string | IQStringField;
	passwordHash?: string | IQStringField;
	ranking?: number | IQNumberField;
	username?: string | IQStringField;
	uuId?: string | IQStringField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	EMAIL?: string | IQStringField;
	PASSWORD_HASH?: string | IQStringField;
	RANKING?: number | IQNumberField;
	USERNAME?: string | IQStringField;
	UUID?: string | IQStringField;

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
	email: IQStringField;
	passwordHash: IQStringField;
	ranking: IQNumberField;
	username: IQStringField;
	uuId: IQStringField;

	// Non-Id Relations

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

