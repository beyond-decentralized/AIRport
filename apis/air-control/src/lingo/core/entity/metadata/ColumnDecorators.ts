import {
	DatabaseForeignKey,
	DatabaseOneToManyElements,
	JSONBaseOperation
}                              from '@airport/ground-control'
import {IAirportDatabase}      from '../../../AirportDatabase'
import {FunctionsAndOperators} from '../../FunctionsAndOperators'
import {PropertyDecorator}     from '../../metadata/decorators'
import {IQEntity}              from '../Entity'

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
	columnDefinition?: string;
	// Name of column
	name: string;
}

export enum ConstraintMode {
	CONSTRAINT, // Apply the constraint.
	NO_CONSTRAINT, // Do not apply the constraint.
	PROVIDER_DEFAULT, // Use the provider-defined default behavior.
}

/**
 * Marks an object property as a SQL column.
 */
export interface ColumnDecorator {
	(columnConfiguration: ColumnConfiguration): PropertyDecorator;
}

export interface ForeignKey extends DatabaseForeignKey {
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
	extends DatabaseOneToManyElements {
	// Not implementing cascade on ManyToOne
	// cascade?:CascadeType;
	// Fetch isn't implemented - all objects are explicitly retrieved
	// fetch?: FetchType;
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
	extends DatabaseOneToManyElements {
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

/**
 * Function used to add a clause to a Join
 */
export interface AddToJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
	(
		otm: QOtm, // One-to-Many IQEntity
		mto: QMto, // Many-to-One IQEntity
		db: IAirportDatabase, // Reference to the Airport functionality
		f: FunctionsAndOperators // Reference to all available functions and operators
	): JSONBaseOperation;
}

/**
 * Modified equivalent of Hibernate Annotation
 */
// export interface WhereJoinTableDecorator<QOtm extends IQEntity, QMto extends IQEntity> {
// 	(
// 		addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
// 		joinFunctionWithOperator?: andOperator | orOperator // How to add the function to the join
// 	): PropertyDecorator;
// }


/**
 * Defines a sub-query that can be joined to
 */
export interface SubQueryDecorator<QOtm extends IQEntity, QMto extends IQEntity> {
	(
		addToJoinFunction: AddToJoinFunction<QOtm, QMto>, // Function to add to the join
	): PropertyDecorator;
}