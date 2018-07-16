import { INumberOperation, JSONRawNumberOperation } from '../operation/NumberOperation';
import { IQOperableField } from './OperableField';
/**
 * Concrete number field.
 */
export interface IQNumberField extends IQOperableField<number, JSONRawNumberOperation, INumberOperation, IQNumberField> {
}
