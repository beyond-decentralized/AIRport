import { PropertyDecorator } from '@airport/direction-indicator';
import {
	DbForeignKey,
	DbOneToManyElements,
	QueryBaseOperation
} from '@airport/ground-control';

/**
 * Marks an object property as the ID column in a SQL table.
 */
export interface IdDecorator {
	(): PropertyDecorator;
}

/**
 * SQL Column configuration.
 */
export interface ColumnConfiguration {
	// columnDefinition?: string;
	// The column Length
	length?: number;
	// Name of column
	name: string;
	// (Optional) Whether the terminal column is nullable.
	nullable?: boolean;
	// The precision of a decimal (total digits)
	precision?: number;
	// The scale of a decimal (digits after the floating point)
	scale?: number;
}

export enum ConstraintMode {
	CONSTRAINT = 'CONSTRAINT', // Apply the constraint.
	NO_CONSTRAINT = 'NO_CONSTRAINT', // Do not apply the constraint.
	PROVIDER_DEFAULT = 'PROVIDER_DEFAULT', // Use the provider-defined default behavior.
}

/**
 * Marks an object property as a SQL column.
 */
export interface ColumnDecorator {
	(columnConfiguration: ColumnConfiguration): PropertyDecorator;
}

export interface ForeignKey
	extends DbForeignKey {
}

/**
 * Join column configuration.
 */
export interface JoinColumnConfiguration
	extends CoreJoinColumnConfiguration {
	foreignKey?: ForeignKey;
}

export interface CoreJoinColumnConfiguration {
	// Name of column
	name: string;
	// (Optional) Whether the foreign key column is nullable.
	nullable?: boolean;
	// nullable: boolean
	// Name of the column on the One-to-Many side (defaults to the single @Id)
	referencedColumnName?: string;
}

export interface JoinColumnsConfiguration {
	value: CoreJoinColumnConfiguration[];
	foreignKey: ForeignKey;
}

/**
 * Marks an object property as a join column.
 */
export interface JoinColumnDecorator {
	(joinColumnConfiguration: JoinColumnConfiguration): PropertyDecorator;
}

/**
 * Marks an object property as a join column.
 */
export interface JoinColumnsDecorator {
	(joinColumnConfigurations: JoinColumnsConfiguration | CoreJoinColumnConfiguration[]): PropertyDecorator;
}

/**
 * Marks an object property as a non-persisted field.
 */
export interface TransientDecorator {
	(): PropertyDecorator;
}

/**
 * Many-To-One relation configuration.
 */
export interface ManyToOneElements
	extends DbOneToManyElements {
	// Cascade isn't implemented - the object graph to cascade is explicitly specified
	// cascade?:CascadeType;
	// Fetch isn't implemented - the object graph to retrieve is also explicitly specified
	// fetch?: FetchType;

	// Whether the association is optional. If set to false then a non-null relationship
	// must always exist.
	optional?: boolean
}

/**
 * Marks an object property as a Many-To-One relation.
 *
 * Specifies a single-valued association to another entity class that has many-to-one
 * multiplicity.
 *
 * http://docs.oracle.com/javaee/7/api/javax/persistence/ManyToOne.html
 */
export interface ManyToOneDecorator {
	(elements?: ManyToOneElements): PropertyDecorator;
}

/**
 * One-To-Many relation configuration
 */
export interface OneToManyElements
	extends DbOneToManyElements {
	// Fetch isn't implemented - all objects are explicitly retrieved
	// fetch?: FetchType;
	// Name of the property on the Many side of the relation
	// Orphan removal is not implemented since there is no entity management,
	// you need to manually call delete on the child object
	// orphanRemoval?: boolean;
}

/**
 * Marks an object property as a One-To-Many relation.
 *
 * Specifies a many-valued association with one-to-many multiplicity.
 *
 * http://docs.oracle.com/javaee/7/api/javax/persistence/OneToMany.html
 */
export interface OneToManyDecorator {
	(elements?: OneToManyElements): PropertyDecorator;
}

/**
 * Marks a column as having a generated value.
 */
export interface GeneratedValueDecorator {
	(): PropertyDecorator;
}

export interface SequenceGeneratorElements {
	allocationSize: number
}

/**
 * Allows to specify initial allocation size for a sequence.
 */
export interface SequenceGeneratorDecorator {
	(elements: SequenceGeneratorElements): PropertyDecorator
}


export interface TraditionalServerSeqDecorator {
	(): PropertyDecorator
}
