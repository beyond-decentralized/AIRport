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
	TableConfiguration,
} from '@airport/air-control';
import {
	ISchemaVersion,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
} from './qschemaversion';
import {
	ISchemaColumn,
	SchemaColumnEId,
	SchemaColumnEOptionalId,
	SchemaColumnEUpdateProperties,
	SchemaColumnESelect,
	QSchemaColumn,
	QSchemaColumnQId,
	QSchemaColumnQRelation,
} from './qschemacolumn';
import {
	ISchemaProperty,
	SchemaPropertyEId,
	SchemaPropertyEOptionalId,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyESelect,
	QSchemaProperty,
	QSchemaPropertyQId,
	QSchemaPropertyQRelation,
} from './qschemaproperty';
import {
	ISchemaRelation,
	SchemaRelationEId,
	SchemaRelationEOptionalId,
	SchemaRelationEUpdateProperties,
	SchemaRelationESelect,
	QSchemaRelation,
	QSchemaRelationQId,
	QSchemaRelationQRelation,
} from './qschemarelation';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaEntity {
	
	// Id Properties
	index?: number;

	// Id Relations
	schemaVersion?: ISchemaVersion;

	// Non-Id Properties
	isLocal?: boolean;
	isRepositoryEntity?: boolean;
	name?: string;
	tableConfig?: TableConfiguration;

	// Non-Id Relations
	columns?: ISchemaColumn[];
	properties?: ISchemaProperty[];
	relations?: ISchemaRelation[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaEntityESelect
    extends IEntitySelectProperties, SchemaEntityEOptionalId, SchemaEntityEUpdateProperties {
	// Id Relations - full property interfaces
	schemaVersion?: SchemaVersionESelect;

  // Non-Id relations (including OneToMany's)
	columns?: SchemaColumnESelect;
	properties?: SchemaPropertyESelect;
	relations?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEntityEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion: SchemaVersionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEntityEOptionalId {
	// Id Properties
	index?: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion?: SchemaVersionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEntityEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	isLocal?: boolean | IQBooleanField;
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEntityEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	IS_LOCAL?: boolean | IQBooleanField;
	IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
	NAME?: string | IQStringField;
	TABLECONFIG?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaEntityECreateProperties
extends SchemaEntityEId, SchemaEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaEntityECreateColumns
extends SchemaEntityEId, SchemaEntityEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaEntity extends QEntity
{
	// Id Fields
	index: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQRelation;

	// Non-Id Fields
	isLocal: IQBooleanField;
	isRepositoryEntity: IQBooleanField;
	name: IQStringField;
	tableConfig: IQStringField;

	// Non-Id Relations
	columns: IQOneToManyRelation<QSchemaColumn>;
	properties: IQOneToManyRelation<QSchemaProperty>;
	relations: IQOneToManyRelation<QSchemaRelation>;

}


// Entity Id Interface
export interface QSchemaEntityQId
{
	
	// Id Fields
	index: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQId;


}

// Entity Relation Interface
export interface QSchemaEntityQRelation
	extends QRelation<QSchemaEntity>, QSchemaEntityQId {
}

