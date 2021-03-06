import { PropertyDecorator } from '@airport/direction-indicator';
import { DatabaseForeignKey, DatabaseOneToManyElements } from '@airport/ground-control';
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
    name: string;
    nullable?: boolean;
    precision?: number;
    scale?: number;
}
export declare enum ConstraintMode {
    CONSTRAINT = "CONSTRAINT",
    NO_CONSTRAINT = "NO_CONSTRAINT",
    PROVIDER_DEFAULT = "PROVIDER_DEFAULT"
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
export interface JoinColumnConfiguration extends CoreJoinColumnConfiguration {
    foreignKey?: ForeignKey;
}
export interface CoreJoinColumnConfiguration {
    name: string;
    nullable?: boolean;
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
export interface ManyToOneElements extends DatabaseOneToManyElements {
    optional?: boolean;
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
export interface OneToManyElements extends DatabaseOneToManyElements {
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
    allocationSize: number;
}
/**
 * Allows to specify initial allocation size for a sequence.
 */
export interface SequenceGeneratorDecorator {
    (elements: SequenceGeneratorElements): PropertyDecorator;
}
export interface TraditionalServerSeqDecorator {
    (): PropertyDecorator;
}
//# sourceMappingURL=ColumnDecorators.d.ts.map