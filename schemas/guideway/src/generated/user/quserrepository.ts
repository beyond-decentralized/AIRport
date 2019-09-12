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
	IRepository,
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	IUser,
	UserECascadeGraph,
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

export interface IUserRepository {
	
	// Id Properties

	// Id Relations
	repository: IRepository;
	user: IUser;

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
export interface UserRepositoryESelect
    extends IEntitySelectProperties, UserRepositoryEOptionalId {
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;
	user?: UserESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserRepositoryEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repository: RepositoryEId;
	user: UserEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface UserRepositoryEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserRepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	permission?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserRepositoryECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface UserRepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	PERMISSION?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserRepositoryECreateProperties
extends Partial<UserRepositoryEId>, UserRepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserRepositoryECreateColumns
extends UserRepositoryEId, UserRepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserRepository extends IQEntity
{
	// Id Fields

	// Id Relations
	repository: QRepositoryQRelation;
	user: QUserQRelation;

	// Non-Id Fields
	permission: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QUserRepositoryQId
{
	
	// Id Fields

	// Id Relations
	repository: QRepositoryQId;
	user: QUserQId;


}

// Entity Relation Interface
export interface QUserRepositoryQRelation
	extends IQRelation<QUserRepository>, QUserRepositoryQId {
}

