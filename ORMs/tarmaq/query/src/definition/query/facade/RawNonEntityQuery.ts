import { QueryBaseOperation } from "@airport/ground-control";
import { IFrom } from '../../core/entity/IQEntity';
import { IQOperableField } from '../../core/field/IQOperableField';
import { RawReadQuery } from "./RawReadQuery";

/**
 * All Non-Entity Queries are defined in this format.
 */
export interface RawNonEntityQuery extends RawReadQuery {
	FROM: IFrom[];
	GROUP_BY?: IQOperableField<any, any, any, any>[];
	HAVING?: QueryBaseOperation,
	LIMIT?: number;
	OFFSET?: number;
}