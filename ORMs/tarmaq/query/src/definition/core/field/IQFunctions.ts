import {
	QueryBaseOperation,
	OperationCategory,
	SqlOperator
}                            from '@airport/ground-control';
import { RawFieldQuery }     from '../../query/facade/RawFieldQuery';
import { RawNonEntityQuery } from '../../query/facade/RawNonEntityQuery';
import {
	ITreeEntity,
	RawTreeQuery
}                            from '../../query/facade/RawTreeQuery';
import { IQBooleanField }    from './IQBooleanField';
import { IQDateField }       from './IQDateField';
import { IQNumberField }     from './IQNumberField';
import { IQOperableField }   from './IQOperableField';
import { IQStringField }     from './IQStringField';
import { IQUntypedField }    from './IQUntypedField';

/**
 * Created by Papa on 10/18/2016.
 */
export interface IQFunction<V extends boolean | Date | Date[] | number | number[]
	| string | string[] | RawFieldQuery<any>> {
	parameterAlias: string;
	value: V;
}

/**
 * ABS(1)
 */
export interface absFunction {
	(
		numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * AVG(1)
 */
export interface avgFunction {
	(
		numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * COUNT(*)
 */
export interface countFunction {
	<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF;
}

/**
 * MAX(*)
 */
export interface maxFunction {
	<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF;
}

/**
 * MIN(*)
 */
export interface minFunction {
	<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF;
}

/**
 * SUM(1)
 */
export interface sumFunction {
	(
		numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

export interface plusFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

export interface coalesceAnyFunction {
	(...vals: (IQUntypedField | any | RawFieldQuery<IQUntypedField>)[]): IQUntypedField
}

export interface coalesceBooleanFunction {
	(...vals: (IQBooleanField | boolean | RawFieldQuery<IQBooleanField>)[]): IQBooleanField
}

export interface coalesceDateFunction {
	(...vals: (IQDateField | Date | RawFieldQuery<IQDateField>)[]): IQDateField
}

export interface coalesceNumberFunction {
	(...vals: (IQNumberField | number | RawFieldQuery<IQNumberField>)[]): IQNumberField
}

export interface coalesceStringFunction {
	(...vals: (IQStringField | string | RawFieldQuery<IQStringField>)[]): IQStringField
}

/**
 * UCASE('')
 */
export interface ucaseFunction {
	(
		stringValue: IQStringField | string | RawFieldQuery<IQStringField>
	): IQStringField;
}

/**
 * LCASE('')
 */
export interface lcaseFunction {
	(
		stringValue: IQStringField | string | RawFieldQuery<any>
	): IQStringField;
}

/**
 * MID('', 1, 2)
 */
export interface midFunction {
	(
		stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
		start: IQNumberField | number | RawFieldQuery<IQNumberField>,
		length: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQStringField;
}

/**
 * LEN('')
 */
export interface lenFunction {
	(
		stringValue: IQStringField | string | RawFieldQuery<IQStringField>
	): IQStringField;
}

/**
 * ROUND(1, 2)
 */
export interface roundFunction {
	(
		numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
		digits?: IQNumberField | number | RawFieldQuery<IQNumberField> // = 0
	): IQNumberField;
}

/**
 * NOW()
 */
export interface nowFunction {
	(): IQDateField;
}

/**
 * FORMAT('', 1, ...)
 */
export interface formatFunction {
	<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, IQF>>(
		format: string | IQStringField | RawFieldQuery<IQF>,
		...formatParameters: (T | IQF | RawFieldQuery<IQF>)[]
	): IQStringField;
}

/**
 * REPLACE('', '', '')
 */
export interface replaceFunction {
	(
		stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
		toReplace: IQStringField | string | RawFieldQuery<IQStringField>,
		replaceWith: IQStringField | string | RawFieldQuery<IQStringField>
	): IQStringField;
}

/**
 * TRIM('')
 */
export interface trimFunction {
	(
		stringField: IQStringField | string | RawFieldQuery<any>
	): IQStringField;
}

/**
 * Concrete instance of a DISTINCT function
 */
export interface IQDistinctFunction<ISelect> {

}

/**
 * SELECT DISTINCT ...
 */
export interface distinctFunction {
	<ISelect>(
		selectClause: ISelect
	): IQDistinctFunction<ISelect>;
}

/**
 * Concrete instance of an EXISTS function
 */
export interface IQExistsFunction
	extends QueryBaseOperation {

	/**
	 * Category of the IOperation.
	 */
	operationCategory: OperationCategory;
	/**
	 * Operator
	 */
	operator: SqlOperator;

}

/**
 * WHERE EXISTS (...)
 */
export interface existsFunction {
	<IME extends ITreeEntity>(rawQuery: RawTreeQuery<IME>): IQExistsFunction;
}

// Algebra Operators

/**
 * A / B
 */
export interface divideFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * A - B
 */
export interface subtractFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * A * B
 */
export interface modulusFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * A * B
 */
export interface multiplyFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * A + B
 */
export interface addFunction {
	(
		numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
		numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
	): IQNumberField;
}

/**
 * A || B
 */
export interface concatenateFunction {
	(
		...fragments: (IQOperableField<any, any, any, any>
			| boolean | Date | number | string | RawFieldQuery<IQOperableField<any, any, any, any>>)[]
	): IQStringField;
}

/**
 * A
 * UNION
 * B
 */
export interface unionFunction {
	(
		...rawQueries: RawNonEntityQuery[]
	): RawNonEntityQuery;
}

/**
 * A
 * UNION ALL
 * B
 */
export interface unionAllFunction {
	(
		...rawQueries: RawNonEntityQuery[]
	): RawNonEntityQuery;
}

/**
 * A
 * INTERSECT
 * B
 */
export interface intersectFunction {
	(
		...rawQueries: RawNonEntityQuery[]
	): RawNonEntityQuery;
}

/**
 * A
 * EXCEPT
 * B
 */
export interface exceptFunction {
	(
		...rawQueries: RawNonEntityQuery[]
	): RawNonEntityQuery;
}

/**
 * Equivalent of the EXCEPT function
 */
export interface minusFunction {
	(
		...rawQueries: RawNonEntityQuery[]
	): RawNonEntityQuery;
}

