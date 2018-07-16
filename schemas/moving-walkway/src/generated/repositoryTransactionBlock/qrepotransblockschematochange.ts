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

export interface IRepoTransBlockSchemasToChange {
	
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
export interface RepoTransBlockSchemasToChangeESelect
    extends IEntitySelectProperties, RepoTransBlockSchemasToChangeEOptionalId, RepoTransBlockSchemasToChangeEUpdateProperties {
	// Id Relations - full property interfaces
	repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
	schema?: SchemaESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockSchemasToChangeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock: RepositoryTransactionBlockEId;
	schema: SchemaEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockSchemasToChangeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
	schema?: SchemaEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemasToChangeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockSchemasToChangeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemasToChangeECreateProperties
extends RepoTransBlockSchemasToChangeEId, RepoTransBlockSchemasToChangeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockSchemasToChangeECreateColumns
extends RepoTransBlockSchemasToChangeEId, RepoTransBlockSchemasToChangeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockSchemasToChange extends QEntity
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
export interface QRepoTransBlockSchemasToChangeQId
{
	
	// Id Fields

	// Id Relations
	repositoryTransactionBlock: QRepositoryTransactionBlockQId;
	schema: QSchemaQId;


}

// Entity Relation Interface
export interface QRepoTransBlockSchemasToChangeQRelation
	extends QRelation<QRepoTransBlockSchemasToChange>, QRepoTransBlockSchemasToChangeQId {
}

