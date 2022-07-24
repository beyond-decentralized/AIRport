import { JSONBaseOperation } from "@airport/ground-control";
import { IFrom } from '../../core/entity/Entity';
import { IQOperableField } from '../../core/field/OperableField';
import { RawQuery } from './Query';

/**
 * All Non-Entity Queries are defined in this format.
 */
export interface RawNonEntityQuery extends RawQuery {
	FROM: IFrom[];
	GROUP_BY?: IQOperableField<any, any, any, any>[];
	HAVING?: JSONBaseOperation,
	LIMIT?: number;
	OFFSET?: number;
}