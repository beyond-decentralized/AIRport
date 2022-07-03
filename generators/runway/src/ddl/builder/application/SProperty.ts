import {
	ApplicationColumn_Index,
	DatabaseForeignKey,
	DatabaseManyToOneElements,
	DatabaseOneToManyElements,
	EntityRelationType,
	ApplicationProperty_Index,
	ApplicationReferenceByIndex
} from '@airport/ground-control';

/**
 * A property of an object in a application.
 */
export interface SProperty {

	/**
	 * All columns that the property is represented by.
	 */
	columns: SColumn[];

	/**
	 * Index of the the property for the entity (parent properties included).
	 */
	index: number;

	/**
	 * Is this property annotated with @Id
	 */
	isId: boolean;

	/**
	 * Name of the property.
	 */
	name: string;

	/**
	 * Is the property optional (does it have the ? character next to it's name)
	 */
	optional: boolean;

	/**
	 * Relation (if any) represented by the property.
	 */
	relation?: SRelation | undefined;

}

/**
 * A application relation.
 */
export interface SRelation {

	/**
	 * Name of the entity behind the relation.
	 */
	entityName: string;

	/**
	 * Index of the application of the related entity (if not local).
	 */
	referencedApplication_Index?: number;

	/**
	 * Explicitly defined foreign key (if any)
	 */
	foreignKey?: DatabaseForeignKey;

	/**
	 * Relation index.
	 */
	index: number;

	/**
	 * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
	 */
	manyToOne?: DatabaseManyToOneElements;

	/**
	 * One-to-Many configuration object (if @OneToMany)
	 */
	oneToMany?: DatabaseOneToManyElements;

	/**
	 * Type of the relation (Many-to-One or One-to-Many)
	 */
	relationType: EntityRelationType;

	/**
	 * For @ManyToOne's not annotated with (R)JoinColumn(s)
	 */
	relationMustBeSingleIdEntity: boolean;

	/**
	 * Does this join automatically join REPOSITORY_LID?
	 * Not needed - all joins to and from Repository entities are automatically repository joins
	 */
	// repositoryJoin: boolean;

	/**
	 * Intermediate representation of relation columns
	 */
	sRelationColumns: SRelationColumn[];

	/**
	 * Serialized function to add to the join
	 * Not currently needed
	 */
	// addToJoinFunction?: string;
	/*
	 * How to add the function to the join
	 */
	// joinFunctionWithOperator?: number;

}

/**
 * A column in a application table.
 */
export interface SColumn
	extends ApplicationReferenceByIndex<ApplicationColumn_Index> {

	/**
	 * How many ids to allocate for a sequence at a time.
	 */
	allocationSize?: number;

	/**
	 * Verbatim DDL for the column (after the name of the column)
	 */
	columnDefinition?: string;

	/**
	 * Id Index of the column (if any).
	 */
	idIndex?: number;

	/**
	 * Is the value for this column generated?
	 */
	isGenerated?: boolean;

	/**
	 * One-to-Many relations that are mapped to this column.
	 */
	// manyRelationColumnRefs: IdKeysByIdColumnIndex[];

	/**
	 * Name of the column.
	 */
	name: string;

	notNull: boolean;

	// The precision of a decimal (total digits)
	precision?: number;

	/**
	 * Properties that are mapped to this column.
	 */
	propertyRefs: ApplicationProperty_Index[];

	// The scale of a decimal (digits after the floating point)
	scale?: number;

	/**
	 * Columns related to this one (needed for type assignment only).
	 */
	tempColumnTypeLinks?: SColumn[];
	//
	// /**
	//  * In which ManyToOne relations is this column present.
	//  */
	// manyRelationColumns?: DbRelationColumn[];
	//
	// /**
	//  * In which OneToMany relations is this column present.
	//  */
	// oneRelationColumns?: DbRelationColumn[];

	/**
	 * Column data type.
	 */
	type: 'any' | 'boolean' | 'Date' | 'number' | 'string' | 'Json';
}

export interface SRelationColumn {

	/**
	 * This this relation column for the Many-To-One side
	 */
	manyToOne: boolean;

	oneSideRelationIndex: number;

	/**
	 * Id index in own table (if available)
	 */
	// ownColumnIdIndex: number;
	/**
	 * Name of the column in own table (if available), or id index encoded definition
	 */

	ownColumnReference: string;

	/**
	 * Id index in related table (if available)
	 */
	// relationColumnIdIndex: number;

	/**
	 * Name of the column in related table (if available), or id index encoded definition
	 */
	relationColumnReference: string;

}
