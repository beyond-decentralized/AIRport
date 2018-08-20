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

export interface ISchemaColumn {
	
	// Id Properties
	index?: number;
	tableIndex?: number;
	schemaVersionId?: number;

	// Id Relations

	// Non-Id Properties
	idIndex?: number;
	isGenerated?: boolean;
	allocationSize?: number;
	name?: string;
	type?: number;

	// Non-Id Relations
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
    extends IEntitySelectProperties, SchemaColumnEOptionalId, SchemaColumnEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	propertyColumns?: SchemaPropertyColumnESelect;
	manyRelationColumns?: SchemaRelationColumnESelect;
	oneRelationColumns?: SchemaRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaColumnEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;
	tableIndex: number | IQNumberField;
	schemaVersionId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaColumnEOptionalId {
	// Id Properties
	index?: number | IQNumberField;
	tableIndex?: number | IQNumberField;
	schemaVersionId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaColumnEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	idIndex?: number | IQNumberField;
	isGenerated?: boolean | IQBooleanField;
	allocationSize?: number | IQNumberField;
	name?: string | IQStringField;
	type?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaColumnEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ID_INDEX?: number | IQNumberField;
	IS_GENERATED?: boolean | IQBooleanField;
	ALLOCATION_SIZE?: number | IQNumberField;
	NAME?: string | IQStringField;
	TYPE?: number | IQNumberField;

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
export interface QSchemaColumn extends QEntity
{
	// Id Fields
	index: IQNumberField;
	tableIndex: IQNumberField;
	schemaVersionId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	idIndex: IQNumberField;
	isGenerated: IQBooleanField;
	allocationSize: IQNumberField;
	name: IQStringField;
	type: IQNumberField;

	// Non-Id Relations
	propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
	manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;

}


// Entity Id Interface
export interface QSchemaColumnQId
{
	
	// Id Fields
	index: IQNumberField;
	tableIndex: IQNumberField;
	schemaVersionId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaColumnQRelation
	extends QRelation<QSchemaColumn>, QSchemaColumnQId {
}

