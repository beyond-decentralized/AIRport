import { RawFieldQuery } from '../../query/facade/RawFieldQuery';
import { IStringOperation, RawStringOperation } from '../operation/IStringOperation';
import { IQOperableField } from './IQOperableField';

/**
 * Concrete string field.
 */
export interface IQStringField
	extends IQOperableField<string, RawStringOperation, IStringOperation, IQStringField> {

	LIKE(
		like: string | IQStringField | RawFieldQuery<IQStringField> | { ( ...args: any[] ): RawFieldQuery<IQStringField> }
	): RawStringOperation;

}