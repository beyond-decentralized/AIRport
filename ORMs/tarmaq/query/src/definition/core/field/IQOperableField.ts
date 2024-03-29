import { DbColumn, DbProperty, QueryBaseOperation } from '@airport/ground-control';
import { RawFieldQuery } from '../../query/facade/RawFieldQuery';
import {
	IOperation,
	IValueOperation,
	RawValueOperation
} from '../operation/IValueOperation';
import {
	IQFieldInternal,
	IQOrderableField
} from './IQFieldInternal';

/**
 * Concrete field that can be operated on with SQL operators.
 */
export interface IQOperableField<T, JO extends QueryBaseOperation, IO extends IOperation, IQF extends IQOperableField<T, JO, IO, any>>
	extends IQOrderableField<IQF> {

	dbColumn: DbColumn
	dbProperty: DbProperty

	/**
	 * A.B = C
	 */
	equals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO;

	/**
	 * A.B > C
	 */
	greaterThan(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO;

	/**
	 * A.B >= C
	 */
	greaterThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO;

	/**
	 * A.B IN (C)
	 */
	IN(
		values: T[] | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO;

	/**
	 * A.B IS NOT NULL
	 */
	IS_NOT_NULL(): JO;

	/**
	 * A.B IS NULL
	 */
	IS_NULL(): JO;

	/**
	 * A.B < C
	 */
	lessThan(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	);

	/**
	 * A.B <= C
	 */
	lessThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	);

	/**
	 * A.B != C
	 */
	notEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO;

	/**
	 * A.B NOT IN (C)
	 */
	NOT_IN(
		values: (T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> })[]
	): JO;

}

export interface IQOperableFieldInternal<T,
	JO extends RawValueOperation<IQF>,
	IO extends IValueOperation<T, JO, IQF>,
	IQF extends IQOperableField<T, JO, IO, IQF>>
	extends IQOperableField<T, JO, IO, IQF>,
	IQFieldInternal<IQF> {

}
