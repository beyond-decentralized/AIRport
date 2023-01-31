import { IDateOperation, RawDateOperation } from '../operation/IDateOperation';
import { IQOperableField } from './IQOperableField';

/**
 * Concrete date field.
 */
export interface IQDateField extends IQOperableField<Date, RawDateOperation, IDateOperation, IQDateField> {
}