import {
	DatabaseForeignKey,
	DatabaseManyToOneElements,
	DatabaseObject,
	DatabaseOneToManyElements,
	DbSchemaVersion,
	EntityRelationType,
	JsonDatabaseObject,
	SQLDataType
}                      from '../../index';
import {
	DbEntity,
	TableIndex
}                      from './Entity';
import { SchemaIndex } from './Schema';

export type ColumnId = number;
export type ColumnIndex = number;
export type ColumnName = string;
export type ColumnNotNull = boolean;
export type ColumnPrecision = string;
export type ColumnScale = string;
// export type ColumnDefinition = string;
export type PropertyId = number;
export type PropertyIndex = number;
export type PropertyIsId = boolean;
export type PropertyName = string;
export type RelationId = number;
export type RelationIndex = number;
export type SchemaColumnIsGenerated = boolean
export type SchemaColumnAllocationSize = number

/**
 * A property of an object in a schema.
 * Parent properties for the entity are indexed at each child table,
 * and are the first entries.
 */
export interface JsonSchemaProperty
	extends SchemaReferenceByIndex<PropertyIndex>,
	        JsonDatabaseObject {

	/**
	 * Does this property consist of @Id columns?
	 */
	isId: PropertyIsId;

	/**
	 * Name of the property.
	 */
	name: PropertyName;

	/**
	 * Column represented by the property.
	 */
	columnRef?: SchemaReferenceByIndex<ColumnIndex>;

	/**
	 * A Relation that is represented by the property (if any).
	 */
	relationRef?: SchemaReferenceByIndex<RelationIndex>;

}

export interface DbProperty
	extends SchemaReferenceByIndex<PropertyIndex>,
	        DatabaseObject {

	id: PropertyId
	entity: DbEntity;
	name: PropertyName;
	isId: PropertyIsId;
	propertyColumns: DbPropertyColumn[];
	relation: DbRelation[];

}

export class DbPropertyColumn {

	column: DbColumn;
	property: DbProperty;
	sinceVersion: DbSchemaVersion;

}

/**
 * A column in a schema table.
 */
export interface JsonSchemaColumn
	extends SchemaReferenceByIndex<ColumnIndex>,
	        JsonDatabaseObject {

	/**
	 * Verbatim DDL for the column (after the name of the column)
	 *
	 * TODO: either sanitize this string or disallow in Client Installations
	 */
	// columnDefinition?: string;

	/**
	 * Is it column a generated value?
	 */
	isGenerated?: SchemaColumnIsGenerated;

	/**
	 * How many ids to allocate at a time
	 */
	allocationSize?: SchemaColumnAllocationSize;

	/**
	 * One-to-Many relations that are mapped to this column.
	 */
	manyRelationColumnRefs: JsonSchemaRelationColumn[];

	/**
	 * Name of the column.
	 */
	name: ColumnName;

	notNull: ColumnNotNull

	// The precision of a decimal (total digits)
	precision?: number;

	/**
	 * Properties that are mapped to this column.
	 */
	propertyRefs: PropertyReference[];

	// The scale of a decimal (digits after the floating point)
	scale?: number;

	/**
	 * Type of the column.
	 */
	type: SQLDataType;

}

export interface IdKeyArrayByIdColumnIndex
	extends Array<(number | string)> {
}

export interface DbColumn
	extends SchemaReferenceByIndex<ColumnIndex>,
	        DatabaseObject {

	allocationSize?: SchemaColumnAllocationSize

	entity: DbEntity

	id: ColumnId

	/**
	 * Id index of this column (if it's an ID column).
	 */
	idIndex?: ColumnIndex

	isGenerated: SchemaColumnIsGenerated

	/**
	 * In which ManyToOne relations is this column present.
	 */
	manyRelationColumns: DbRelationColumn[]

	name: ColumnName

	notNull: ColumnNotNull

	/**
	 * In which OneToMany relations is this column present.
	 */
	oneRelationColumns: DbRelationColumn[]

	// The precision of a decimal (total digits)
	precision?: number;
	/**
	 * In which properties is this column present.
	 */
	propertyColumns: DbPropertyColumn[]

	propertyColumnMap: { [propertyIndex: number]: DbPropertyColumn }

	// The scale of a decimal (digits after the floating point)
	scale?: number;

	type: SQLDataType

}

export interface SchemaReferenceByIndex<ID extends number> {

	/**
	 * Index of the referenced object.
	 */
	index: ID;

}

export interface PropertyReference
	extends SchemaReferenceByIndex<PropertyIndex> {

}

/**
 * A schema relation.
 */
export interface JsonSchemaRelation
	extends SchemaReferenceByIndex<RelationIndex>,
	        JsonDatabaseObject {

	/**
	 * Foreign key definition, if provided by (R)JoinColumn(s)
	 */
	foreignKey?: DatabaseForeignKey;

	/**
	 * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
	 */
	manyToOneElems?: DatabaseManyToOneElements | true;

	/**
	 * One-to-Many configuration object (if @OneToMany).
	 */
	oneToManyElems?: DatabaseOneToManyElements;

	/**
	 * Type of the relation (Many-to-One or One-to-Many)
	 */
	relationType: EntityRelationType;

	/**
	 * A property that is mapped to this relation.
	 */
	propertyRef: PropertyReference;

	/**
	 * True if join automatically includes REPOSITORY_ID.
	 * Not needed - all joins to and from Repository entities are automatically repository
	 * joins
	 */
	// isRepositoryJoin: boolean;

	/**
	 * True if this relation has @Id() decorator.
	 */
	isId: boolean;

	/**
	 * Related table's schema index (as defined in schema-local schema references).
	 */
	relationTableSchemaIndex?: SchemaIndex;

	/**
	 * Related table index.
	 */
	relationTableIndex: TableIndex;

	/**
	 * Serialized function to add to the join.
	 * Not needed - add back when @WhereJoinTable is supported
	 */
	// addToJoinFunction?: string;

	/**
	 * How to add the function to the join (AND | OR)
	 * Not needed - add back when @WhereJoinTable is supported
	 */
	// joinFunctionWithOperator?: number;

}

export interface DbRelation
	extends SchemaReferenceByIndex<RelationIndex>,
	        DatabaseObject {

	id: RelationId

	entity: DbEntity
	foreignKey: DatabaseForeignKey
	isId: boolean;
	/**
	 * Not needed - all joins to and from Repository entities are automatically repository
	 * joins
	 */
	// isRepositoryJoin: boolean;
	manyRelationColumns: DbRelationColumn[];
	manyToOneElems: DatabaseManyToOneElements | true;
	oneRelationColumns?: DbRelationColumn[];
	oneToManyElems: DatabaseOneToManyElements;
	property: DbProperty;
	relationEntity: DbEntity;
	relationType: EntityRelationType;
	// addToJoinFunction?: string; // Serialized function to add to the join
	// joinFunctionWithOperator?: number; // How to add the function to the join
	// whereJoinTable?: WhereJoinTableDeserialized;
}

// export interface WhereJoinTableDeserialized {
// 	//
// https://stackoverflow.com/questions/7395686/how-can-i-serialize-a-function-in-javascript
// addToJoinFunction: AddToJoinFunction<any, any>, // Function to add to the join
// joinFunctionWithOperator?: andOperator | orOperator // How to add the function to the
// join  }

export interface JsonSchemaRelationColumn
	extends JsonDatabaseObject {

	manyRelationIndex: RelationIndex;
	oneSchemaIndex: SchemaIndex;
	oneTableIndex: TableIndex;
	oneRelationIndex?: RelationIndex;
	oneColumnIndex: ColumnIndex;

}

export interface DbRelationColumn
	extends DatabaseObject {

	id: number;

	manyColumn: DbColumn;

	/**
	 * Only present if @ManyToOne side of the relationship is defined.
	 */
	manyRelation?: DbRelation;

	oneColumn: DbColumn;

	/**
	 * Only present if @OneToMany side of the relationship is defined.
	 */
	oneRelation?: DbRelation;

	parentRelation: DbRelation;

}
