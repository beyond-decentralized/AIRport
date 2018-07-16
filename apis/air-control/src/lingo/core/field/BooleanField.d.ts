import { IBooleanOperation, JSONRawBooleanOperation } from '../operation/BooleanOperation';
import { IQOperableField } from './OperableField';
/**
 * Concrete boolean field.
 */
export interface IQBooleanField extends IQOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField> {
}
