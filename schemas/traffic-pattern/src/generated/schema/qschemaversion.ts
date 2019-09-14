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
	ISchemaEntity,
	SchemaEntityECascadeGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from './qschemaentity';
import {
	ISchemaReference,
	SchemaReferenceECascadeGraph,
	SchemaReferenceEId,
	SchemaReferenceEOptionalId,
	SchemaReferenceEUpdateProperties,
	SchemaReferenceESelect,
	QSchemaReference,
	QSchemaReferenceQId,
	QSchemaReferenceQRelation,
} from './qschemareference';
import {
	ISchema,
	SchemaECascadeGraph,
	SchemaEId,
	SchemaEOptionalId,
	SchemaEUpdateProperties,
	SchemaESelect,
	QSchema,
	QSchemaQId,
	QSchemaQRelation,
} from './qschema';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaVersion {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	integerVersion?: number;
	versionString?: string;
	majorVersion?: number;
	minorVersion?: number;
	patchVersion?: number;

	// Non-Id Relations
	schema?: ISchema;
	entities?: ISchemaEntity[];
	references?: ISchemaReference[];
	referencedBy?: ISchemaReference[];

	// Transient Properties
	entityMapByName?: { [entityName: string]: ISchemaEntity; };
	referencesMapByName?: { [schemaName: string]: ISchemaReference; };
	referencedByMapByName?: { [schemaName: string]: ISchemaReference; };

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaVersionESelect
    extends IEntitySelectProperties, SchemaVersionEOptionalId {
	// Non-Id Properties
	integerVersion?: number | IQNumberField;
	versionString?: string | IQStringField;
	majorVersion?: number | IQNumberField;
	minorVersion?: number | IQNumberField;
	patchVersion?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	schema?: SchemaESelect;
	entities?: SchemaEntityESelect;
	references?: SchemaReferenceESelect;
	referencedBy?: SchemaReferenceESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaVersionEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaVersionEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaVersionEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	integerVersion?: number | IQNumberField;
	versionString?: string | IQStringField;
	majorVersion?: number | IQNumberField;
	minorVersion?: number | IQNumberField;
	patchVersion?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	schema?: SchemaEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaVersionECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations
	entities?: SchemaEntityECascadeGraph;
	references?: SchemaReferenceECascadeGraph;
	referencedBy?: SchemaReferenceECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaVersionEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	INTEGER_VERSION?: number | IQNumberField;
	VERSION_STRING?: string | IQStringField;
	MAJOR_VERSION?: number | IQNumberField;
	MINOR_VERSION?: number | IQNumberField;
	PATCH_VERSION?: number | IQNumberField;
	SCHEMA_INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaVersionECreateProperties
extends Partial<SchemaVersionEId>, SchemaVersionEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaVersionECreateColumns
extends SchemaVersionEId, SchemaVersionEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaVersion extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	integerVersion: IQNumberField;
	versionString: IQStringField;
	majorVersion: IQNumberField;
	minorVersion: IQNumberField;
	patchVersion: IQNumberField;

	// Non-Id Relations
	schema: QSchemaQRelation;
	entities: IQOneToManyRelation<QSchemaEntity>;
	references: IQOneToManyRelation<QSchemaReference>;
	referencedBy: IQOneToManyRelation<QSchemaReference>;

}


// Entity Id Interface
export interface QSchemaVersionQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaVersionQRelation
	extends IQRelation<QSchemaVersion>, QSchemaVersionQId {
}

