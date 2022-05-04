import { IQBooleanField } from './BooleanField';
import { IQDateField } from './DateField';
import { IQNumberField } from './NumberField';
import { IQStringField } from './StringField';
/**
 * Wraps a boolean primitive to allow application of SQL operators and functions.
 */
export interface boolFunction {
    (primitive: boolean): IQBooleanField;
}
/**
 * Wraps a Date object to allow application of SQL operators and functions.
 */
export interface dateFunction {
    (primitive: Date): IQDateField;
}
/**
 * Wraps a number primitive to allow application of SQL operators and functions.
 */
export interface numFunction {
    (primitive: number): IQNumberField;
}
/**
 * Wraps a string primitive to allow application of SQL operators and functions.
 */
export interface strFunction {
    (primitive: string): IQStringField;
}
//# sourceMappingURL=WrapperFunctions.d.ts.map