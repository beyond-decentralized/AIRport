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
	IVersionedSchemaObject,
	VersionedSchemaObjectEId,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectESelect,
	QVersionedSchemaObjectQId,
	QVersionedSchemaObjectQRelation,
	QVersionedSchemaObject,
} from './qversionedschemaobject';
import {
	ISchemaColumn,
	ISchemaProperty,
} from '../../';
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

export interface ISchemaEntity extends IVersionedSchemaObject {
	
	// Id Properties
	id?: number;

	// Id Relations
	schemaVersion?: ISchemaVersion;

	// Non-Id Properties
	index?: number;
	isLocal?: boolean;
	isRepositoryEntity?: boolean;
	name?: string;
	tableConfig?: TableConfiguration;

	// Non-Id Relations
	columns?: ISchemaColumn[];
	properties?: ISchemaProperty[];
	relations?: ISchemaRelation[];
	relationReferences?: ISchemaRelation[];

	// Transient Properties
	columnMap?: { [name: string]: ISchemaColumn; };
	idColumns?: ISchemaColumn[];
	idColumnMap?: { [name: string]: ISchemaColumn; };
	propertyMap?: { [name: string]: ISchemaProperty; };

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaEntityESelect
    extends VersionedSchemaObjectESelect, SchemaEntityEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Id Relations - full property interfaces
	schemaVersion?: SchemaVersionESelect;

  // Non-Id relations (including OneToMany's)
	columns?: SchemaColumnESelect;
	properties?: SchemaPropertyESelect;
	relations?: SchemaRelationESelect;
	relationReferences?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEntityEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion: SchemaVersionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEntityEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion?: SchemaVersionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEntityEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
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
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	INDEX?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
	NAME?: string | IQStringField;
	TABLE_CONFIGURATION?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaEntityECreateProperties
extends Partial<SchemaEntityEId>, SchemaEntityEUpdateProperties {
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
export interface QSchemaEntity extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQRelation;

	// Non-Id Fields
	index: IQNumberField;
	isLocal: IQBooleanField;
	isRepositoryEntity: IQBooleanField;
	name: IQStringField;
	tableConfig: IQStringField;

	// Non-Id Relations
	columns: IQOneToManyRelation<QSchemaColumn>;
	properties: IQOneToManyRelation<QSchemaProperty>;
	relations: IQOneToManyRelation<QSchemaRelation>;
	relationReferences: IQOneToManyRelation<QSchemaRelation>;

}


// Entity Id Interface
export interface QSchemaEntityQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQId;


}

// Entity Relation Interface
export interface QSchemaEntityQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaEntity>, QSchemaEntityQId {
}

