import { IQOrderableField } from '../../core/field/IQFieldInternal';
import { IQDistinctFunction } from '../../core/field/IQFunctions';
import { RawNonEntityQuery } from './RawNonEntityQuery';

/**
 * Field queries are defined in this format.
 */
export interface RawFieldQuery<IQF extends IQOrderableField<IQF>>
	extends RawNonEntityQuery {
	SELECT: IQF | IQDistinctFunction<IQF>;
}