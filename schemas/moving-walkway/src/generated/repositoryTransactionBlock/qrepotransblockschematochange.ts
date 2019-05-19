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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IRepositoryTransactionBlock,
	RepositoryTransactionBlockEId,
	RepositoryTransactionBlockEOptionalId,
	RepositoryTransactionBlockEUpdateProperties,
	RepositoryTransactionBlockESelect,
	QRepositoryTransactionBlock,
	QRepositoryTransactionBlockQId,
	QRepositoryTransactionBlockQRelation,
} from './qrepositorytransactionblock';
import {
	ISchema,
	SchemaEId,
	SchemaEOptionalId,
	SchemaEUpdateProperties,
	SchemaESelect,
	QSchema,
	QSchemaQId,
	QSchemaQRelation,
} from '@airport/traffic-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepoTransBlockSchemaToChange {
	
	// Id Properties

	// Id Relations
	repositoryTransactionBlock?: IRepositoryTransactionBlock;
	schema?: ISchema;

	// Non-Id Properties
	status?: number;

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
export interface RepoTransBlockSchemaToChangeESelect
    extends IEntitySelectProperties, RepoTransBlockSchemaToChangeEOptionalId {
	// Non-Id Properties
	status?: number | IQNumberField;

	// Id Relations - full property interfaces
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
	schema?: SchemaESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockSchemaToChangeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock: RepositoryTransactionBlockEId;
	schema: SchemaEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockSchemaToChangeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
	schema?: SchemaEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockSchemaToChangeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeECreateProperties
extends Partial<RepoTransBlockSchemaToChangeEId>, RepoTransBlockSchemaToChangeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockSchemaToChangeECreateColumns
extends RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockSchemaToChange extends IQEntity
{
	// Id Fields

	// Id Relations
	repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
	schema: QSchemaQRelation;

	// Non-Id Fields
	status: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRepoTransBlockSchemaToChangeQId
{
	
	// Id Fields

	// Id Relations
	repositoryTransactionBlock: QRepositoryTransactionBlockQId;
	schema: QSchemaQId;


}

// Entity Relation Interface
export interface QRepoTransBlockSchemaToChangeQRelation
	extends IQRelation<QRepoTransBlockSchemaToChange>, QRepoTransBlockSchemaToChangeQId {
}

