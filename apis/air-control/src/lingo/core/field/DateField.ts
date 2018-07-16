import { IDateOperation, JSONRawDateOperation } from '../operation/DateOperation';
import { IQOperableField } from './OperableField';

/**
 * Concrete date field.
 */
export interface IQDateField extends IQOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField> {
}