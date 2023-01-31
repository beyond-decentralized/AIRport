import { INumberOperation, RawNumberOperation } from '../operation/INumberOperation';
import { IQOperableField } from './IQOperableField';

/**
 * Concrete number field.
 */
export interface IQNumberField extends IQOperableField<number, RawNumberOperation, INumberOperation, IQNumberField> {

}