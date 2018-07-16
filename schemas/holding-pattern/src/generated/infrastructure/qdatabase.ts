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
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from './quser';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IDatabase {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	name?: string;
	secondId?: number;
	isLocal?: boolean;

	// Non-Id Relations
	owner?: IUser;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseESelect
    extends IEntitySelectProperties, DatabaseEOptionalId, DatabaseEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;
	secondId?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	owner?: UserEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;
	SECOND_ID?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	OWNER_USER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseECreateProperties
extends DatabaseEId, DatabaseEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseECreateColumns
extends DatabaseEId, DatabaseEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabase extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;
	secondId: IQNumberField;
	isLocal: IQBooleanField;

	// Non-Id Relations
	owner: QUserQRelation;

}


// Entity Id Interface
export interface QDatabaseQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDatabaseQRelation
	extends QRelation<QDatabase>, QDatabaseQId {
}

