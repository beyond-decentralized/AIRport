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
	IVersionedSchemaObject,
	VersionedSchemaObjectECascadeGraph,
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
	ISchemaPropertyColumn,
	SchemaPropertyColumnECascadeGraph,
	SchemaPropertyColumnEId,
	SchemaPropertyColumnEOptionalId,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnESelect,
	QSchemaPropertyColumn,
	QSchemaPropertyColumnQId,
	QSchemaPropertyColumnQRelation,
} from './qschemapropertycolumn';
import {
	ISchemaRelation,
	SchemaRelationECascadeGraph,
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

export interface ISchemaProperty extends IVersionedSchemaObject {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	index?: number;
	name?: string;
	isId?: boolean;

	// Non-Id Relations
	entity?: ISchemaEntity;
	propertyColumns?: ISchemaPropertyColumn[];
	relation?: ISchemaRelation[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaPropertyESelect
    extends VersionedSchemaObjectESelect, SchemaPropertyEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: SchemaEntityESelect;
	propertyColumns?: SchemaPropertyColumnESelect;
	relation?: SchemaRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaPropertyEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaPropertyEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaPropertyEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: SchemaEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaPropertyECascadeGraph
	extends VersionedSchemaObjectECascadeGraph {
	// Cascading Relations
	propertyColumns?: SchemaPropertyColumnECascadeGraph;
	relation?: SchemaRelationECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaPropertyEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	PROPERTY_INDEX?: number | IQNumberField;
	NAME?: string | IQStringField;
	IS_ID?: boolean | IQBooleanField;
	SCHEMA_ENTITY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaPropertyECreateProperties
extends Partial<SchemaPropertyEId>, SchemaPropertyEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaPropertyECreateColumns
extends SchemaPropertyEId, SchemaPropertyEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaProperty extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	name: IQStringField;
	isId: IQBooleanField;

	// Non-Id Relations
	entity: QSchemaEntityQRelation;
	propertyColumns: IQOneToManyRelation<QSchemaPropertyColumn>;
	relation: IQOneToManyRelation<QSchemaRelation>;

}


// Entity Id Interface
export interface QSchemaPropertyQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaPropertyQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaProperty>, QSchemaPropertyQId {
}

