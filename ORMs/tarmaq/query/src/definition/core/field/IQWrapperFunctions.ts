import { IQBooleanField } from './IQBooleanField';
import { IQDateField } from './IQDateField';
import { IQNumberField } from './IQNumberField';
import { IQStringField } from './IQStringField';

/**
 * Wraps a boolean primitive to allow application of SQL operators and functions.
 */
export interface boolFunction {
	(
		primitive: boolean
	): IQBooleanField;
}

/**
 * Wraps a Date object to allow application of SQL operators and functions.
 */
export interface dateFunction {
	(
		primitive: Date
	): IQDateField;
}

/**
 * Wraps a number primitive to allow application of SQL operators and functions.
 */
export interface numFunction {
	(
		primitive: number
	): IQNumberField;
}

/**
 * Wraps a string primitive to allow application of SQL operators and functions.
 */
export interface strFunction {
	(
		primitive: string
	): IQStringField;
}