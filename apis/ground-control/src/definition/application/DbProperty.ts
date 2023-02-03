import {
	DbForeignKey,
	DbManyToOneElements,
	DbVersionedObject,
	DbOneToManyElements,
	EntityRelationType,
	JsonObject,
	SQLDataType
} from '../../index';
import {
	DbEntity,
	DbEntity_TableIndex
} from './DbEntity';
import { DbApplication_Index } from './DbApplication';

export type DbColumn_LocalId = number;
export type DbColumn_Index = number;
export type DbColumn_Name = string;
export type DbColumn_NotNull = boolean;
export type DbColumn_Precision = number;
export type DbColumn_Scale = number;
// export type ColumnDefinition = string;
export type DbProperty_LocalId = number;
export type DbProperty_Index = number;
export type DbProperty_IsId = boolean;
export type DbProperty_Name = string;
export type DbRelation_LocalId = number;
export type DbRelation_Index = number;
export type DbRelationColumn_LocalId = number;
export type DbColumn_IsGenerated = boolean
export type DbColumn_AllocationSize = number

/**
 * A property of an object in a application.
 * Parent properties for the entity are indexed at each child table,
 * and are the first entries.
 */
export interface JsonProperty
	extends DbApplicationReferenceByIndex<DbProperty_Index>,
	JsonObject {

	/**
	 * Does this property consist of @Id columns?
	 */
	isId: DbProperty_IsId;

	/**
	 * Name of the property.
	 */
	name: DbProperty_Name;

	/**
	 * Column represented by the property.
	 */
	columnRef?: DbApplicationReferenceByIndex<DbColumn_Index>;

	/**
	 * A Relation that is represented by the property (if any).
	 */
	relationRef?: DbApplicationReferenceByIndex<DbRelation_Index>;

}

export interface DbProperty
	extends DbApplicationReferenceByIndex<DbProperty_Index>,
	DbVersionedObject {

	_localId: DbProperty_LocalId
	entity: DbEntity;
	name: DbProperty_Name;
	isId: DbProperty_IsId;
	propertyColumns: DbPropertyColumn[];
	relation?: DbRelation[];

}

export interface DbPropertyColumn
	extends DbVersionedObject {

	column: DbColumn;
	property: DbProperty;
	// sinceVersion: DbApplicationVersion;

}

/**
 * A column in a application table.
 */
export interface JsonColumn
	extends DbApplicationReferenceByIndex<DbColumn_Index>,
	JsonObject {

	/**
	 * Verbatim DDL for the column (after the name of the column)
	 *
	 * TODO: either sanitize this string or disallow in Client Installations
	 */
	// columnDefinition?: string;

	/**
	 * Is it column a generated value?
	 */
	isGenerated?: DbColumn_IsGenerated;

	/**
	 * How many _localIds to allocate at a time
	 */
	allocationSize?: DbColumn_AllocationSize;

	/**
	 * One-to-Many relations that are mapped to this column.
	 */
	manyRelationColumnRefs: JsonRelationColumn[];

	/**
	 * Name of the column.
	 */
	name: DbColumn_Name;

	notNull: DbColumn_NotNull

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
	extends DbApplicationReferenceByIndex<DbColumn_Index>,
	DbVersionedObject {

	_localId: DbColumn_LocalId

	allocationSize?: DbColumn_AllocationSize

	entity: DbEntity

	/**
	 * Id index of this column (if it's an ID column).
	 */
	idIndex?: DbColumn_Index

	isGenerated: DbColumn_IsGenerated

	/**
	 * In which ManyToOne relations is this column present.
	 */
	manyRelationColumns?: DbRelationColumn[]

	name: DbColumn_Name

	notNull: DbColumn_NotNull

	/**
	 * In which OneToMany relations is this column present.
	 */
	oneRelationColumns?: DbRelationColumn[]

	// The precision of a decimal (total digits)
	precision?: number;
	/**
	 * In which properties is this column present.
	 */
	propertyColumns: DbPropertyColumn[]

	propertyColumnMap?: { [propertyIndex: number]: DbPropertyColumn }

	// The scale of a decimal (digits after the floating point)
	scale?: number;

	type: SQLDataType

}

export interface DbApplicationReferenceByIndex<ID extends number> {

	/**
	 * Index of the referenced object.
	 */
	index: ID;

}

export interface PropertyReference
	extends DbApplicationReferenceByIndex<DbProperty_Index> {

}

/**
 * A application relation.
 */
export interface JsonRelation
	extends DbApplicationReferenceByIndex<DbRelation_Index>,
	JsonObject {

	/**
	 * Foreign key definition, if provided by (R)JoinColumn(s)
	 */
	foreignKey?: DbForeignKey;

	/**
	 * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
	 */
	manyToOneElems?: DbManyToOneElements;

	/**
	 * One-to-Many configuration object (if @OneToMany).
	 */
	oneToManyElems?: DbOneToManyElements;

	/**
	 * Type of the relation (Many-to-One or One-to-Many)
	 */
	relationType: EntityRelationType;

	/**
	 * A property that is mapped to this relation.
	 */
	propertyRef: PropertyReference;

	/**
	 * True if join automatically includes REPOSITORY_LID.
	 * Not needed - all joins to and from Repository entities are automatically repository
	 * joins
	 */
	// isRepositoryJoin: boolean;

	/**
	 * True if this relation has @Id() decorator.
	 */
	isId: boolean;

	/**
	 * Related table's application index (as defined in application-local application references).
	 */
	relationTableDbApplication_Index?: DbApplication_Index;

	/**
	 * Related table index.
	 */
	relationTableIndex: DbEntity_TableIndex;

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
	extends DbApplicationReferenceByIndex<DbRelation_Index>,
	DbVersionedObject {

	_localId: DbRelation_LocalId

	entity: DbEntity
	foreignKey?: DbForeignKey
	isId: boolean;
	/**
	 * Not needed - all joins to and from Repository entities are automatically repository
	 * joins
	 */
	// isRepositoryJoin: boolean;
	manyRelationColumns?: DbRelationColumn[];
	manyToOneElems?: DbManyToOneElements;
	oneRelationColumns?: DbRelationColumn[];
	oneToManyElems?: DbOneToManyElements;
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

export interface JsonRelationColumn
	extends JsonObject {

	manyRelationIndex: DbRelation_Index;
	oneDbApplication_Index: DbApplication_Index;
	oneTableIndex: DbEntity_TableIndex;
	oneRelationIndex?: DbRelation_Index;
	oneColumnIndex: DbColumn_Index;

}

export interface DbRelationColumn
	extends DbVersionedObject {

	_localId: DbRelationColumn_LocalId;

	manyColumn?: DbColumn;

	/**
	 * Only present if @ManyToOne side of the relationship is defined.
	 */
	manyRelation?: DbRelation;

	oneColumn?: DbColumn;

	/**
	 * Only present if @OneToMany side of the relationship is defined.
	 */
	oneRelation?: DbRelation;

	parentRelation?: DbRelation;

}
