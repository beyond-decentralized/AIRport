import {Primitive}          from "@airport/ground-control";
import {IQOrderableField}   from '../../core/field/IQFieldInternal';
import {IQDistinctFunction} from '../../core/field/IQFunctions';
import {RawNonEntityQuery}  from './RawNonEntityQuery';

/**
 * Sheet query format.
 */
export interface RawSheetQuery
	extends RawNonEntityQuery {
	SELECT: (IQOrderableField<any> | Primitive)[] | IQDistinctFunction<IQOrderableField<any>[]>;
}