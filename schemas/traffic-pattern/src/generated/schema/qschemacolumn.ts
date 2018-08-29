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
	ISchemaEntity,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from './qschemaentity';
import {
	ISchemaPropertyColumn,
	SchemaPropertyColumnEId,
	SchemaPropertyColumnEOptionalId,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnESelect,
	QSchemaPropertyColumn,
	QSchemaPropertyColumnQId,
	QSchemaPropertyColumnQRelation,
} from './qschemapropertycolumn';
import {
	ISchemaRelationColumn,
	SchemaRelationColumnEId,
	SchemaRelationColumnEOptionalId,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnESelect,
	QSchemaRelationColumn,
	QSchemaRelationColumnQId,
	QSchemaRelationColumnQRelation,
} from './qschemarelationcolumn';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchemaColumn extends IVersionedSchemaObject {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	idIndex?: number;
	isGenerated?: boolean;
	allocationSize?: number;
	name?: string;
	type?: number;

	// Non-Id Relations
	entity?: ISchemaEntity;
	propertyColumns?: ISchemaPropertyColumn[];
	manyRelationColumns?: ISchemaRelationColumn[];
	oneRelationColumns?: ISchemaRelationColumn[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaColumnESelect
    extends VersionedSchemaObjectESelect, SchemaColumnEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	type?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: SchemaEntityESelect;
	propertyColumns?: SchemaPropertyColumnESelect;
	manyRelationColumns?: SchemaRelationColumnESelect;
	oneRelationColumns?: SchemaRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaColumnEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaColumnEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaColumnEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	type?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: SchemaEntityEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaColumnEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	INDEX?: number | IQNumberField;
	ID_INDEX?: number | IQNumberField;
	IS_GENERATED?: boolean | IQBooleanField;
	ALLOCATION_SIZE?: number | IQNumberField;
	NAME?: string | IQStringField;
	TYPE?: number | IQNumberField;
	SCHEMA_ENTITY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaColumnECreateProperties
extends Partial<SchemaColumnEId>, SchemaColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaColumnECreateColumns
extends SchemaColumnEId, SchemaColumnEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaColumn extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	idIndex: IQNumberField;
	isGenerated: IQBooleanField;
	allocationSize: IQNumberField;
	name: IQStringField;
	type: IQNumberField;

	// Non-Id Relations
	entity: QSchemaEntityQRelation;
	propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
	manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;

}


// Entity Id Interface
export interface QSchemaColumnQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaColumnQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaColumn>, QSchemaColumnQId {
}

