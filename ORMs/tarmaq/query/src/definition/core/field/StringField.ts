import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IStringOperation, JSONRawStringOperation } from '../operation/StringOperation';
import { IQOperableField } from './OperableField';

/**
 * Concrete string field.
 */
export interface IQStringField
	extends IQOperableField<string, JSONRawStringOperation, IStringOperation, IQStringField> {

	LIKE(
		like: string | IQStringField | RawFieldQuery<IQStringField> | { ( ...args: any[] ): RawFieldQuery<IQStringField> }
	): JSONRawStringOperation;

}