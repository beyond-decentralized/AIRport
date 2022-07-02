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
	UserGraph,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
	IUser,
} from '@airport/travel-document-checkpoint';
import {
	RepositoryTransactionHistoryGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '../history/qrepositorytransactionhistory';
import {
	IRepositoryTransactionHistory,
} from '../history/repositorytransactionhistory';
import {
	IRepository,
} from './repository';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends IEntitySelectProperties, RepositoryEOptionalId {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;
	GUID?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	owner?: UserESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;
	GUID?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	owner?: UserEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph
	extends RepositoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;
	createdAt?: Date | IQDateField;
	immutable?: boolean | IQBooleanField;
	source?: string | IQStringField;
	GUID?: string | IQStringField;

	// Relations
	owner?: UserGraph;
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	AGE_SUITABILITY?: number | IQNumberField;
	CREATED_AT?: Date | IQDateField;
	IMMUTABLE?: boolean | IQBooleanField;
	SOURCE?: string | IQStringField;
	GUID?: string | IQStringField;
	OWNER_USER_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties
extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns
extends RepositoryEId, RepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	ageSuitability: IQNumberField;
	createdAt: IQDateField;
	immutable: IQBooleanField;
	source: IQStringField;
	GUID: IQStringField;

	// Non-Id Relations
	owner: QUserQRelation;
	repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;

}


// Entity Id Interface
export interface QRepositoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends IQRelation<QRepository>, QRepositoryQId {
}

