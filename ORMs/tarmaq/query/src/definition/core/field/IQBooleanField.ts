import { IBooleanOperation, RawBooleanOperation } from '../operation/IBooleanOperation';
import { IQOperableField } from './IQOperableField';

/**
 * Concrete boolean field.
 */
export interface IQBooleanField extends IQOperableField<boolean, RawBooleanOperation, IBooleanOperation, IQBooleanField> {
}