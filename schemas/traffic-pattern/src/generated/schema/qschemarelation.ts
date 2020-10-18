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
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/air-control';
import {
	VersionedSchemaObjectGraph,
	VersionedSchemaObjectEId,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectESelect,
	QVersionedSchemaObjectQId,
	QVersionedSchemaObjectQRelation,
	QVersionedSchemaObject,
} from './qversionedschemaobject';
import {
	SchemaPropertyGraph,
	SchemaPropertyEId,
	SchemaPropertyEOptionalId,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyESelect,
	QSchemaProperty,
	QSchemaPropertyQId,
	QSchemaPropertyQRelation,
} from './qschemaproperty';
import {
	SchemaEntityGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from './qschemaentity';
import {
	SchemaRelationColumnGraph,
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
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaRelationESelect
    extends VersionedSchemaObjectESelect, SchemaRelationEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: number | IQNumberField;
	isId?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	property?: SchemaPropertyESelect;
	entity?: SchemaEntityESelect;
	relationEntity?: SchemaEntityESelect;
	manyRelationColumns?: SchemaRelationColumnESelect;
	oneRelationColumns?: SchemaRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaRelationEId
    extends VersionedSchemaObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaRelationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaRelationEUpdateProperties
	extends VersionedSchemaObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: number | IQNumberField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	property?: SchemaPropertyEOptionalId;
	entity?: SchemaEntityEOptionalId;
	relationEntity?: SchemaEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaRelationGraph
	extends SchemaRelationEOptionalId, VersionedSchemaObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: number | IQNumberField;
	isId?: boolean | IQBooleanField;

	// Relations
	property?: SchemaPropertyGraph;
	entity?: SchemaEntityGraph;
	relationEntity?: SchemaEntityGraph;
	manyRelationColumns?: SchemaRelationColumnGraph[];
	oneRelationColumns?: SchemaRelationColumnGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaRelationEUpdateColumns
	extends VersionedSchemaObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_SCHEMA_VERSION_ID?: number | IQNumberField;
	SINCE_SCHEMA_VERSION_ID?: number | IQNumberField;
	RELATION_INDEX?: number | IQNumberField;
	FOREIGN_KEY?: string | IQStringField;
	MANY_TO_ONE_ELEMENTS?: string | IQStringField;
	ONE_TO_MANY_ELEMENTS?: string | IQStringField;
	RELATION_TYPE?: number | IQNumberField;
	IS_ID?: boolean | IQBooleanField;
	SCHEMA_PROPERTY_ID?: number | IQNumberField;
	SCHEMA_TABLE_ID?: number | IQNumberField;
	RELATION_SCHEMA_TABLE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaRelationECreateProperties
extends Partial<SchemaRelationEId>, SchemaRelationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaRelationECreateColumns
extends SchemaRelationEId, SchemaRelationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchemaRelation extends QVersionedSchemaObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	foreignKey: IQStringField;
	manyToOneElems: IQStringField;
	oneToManyElems: IQStringField;
	relationType: IQNumberField;
	isId: IQBooleanField;

	// Non-Id Relations
	property: QSchemaPropertyQRelation;
	entity: QSchemaEntityQRelation;
	relationEntity: QSchemaEntityQRelation;
	manyRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QSchemaRelationColumn>;

}


// Entity Id Interface
export interface QSchemaRelationQId extends QVersionedSchemaObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaRelationQRelation
	extends QVersionedSchemaObjectQRelation<QSchemaRelation>, QSchemaRelationQId {
}

