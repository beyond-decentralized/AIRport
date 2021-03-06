import { JSONBaseOperation } from "@airport/ground-control";
import { IFrom } from '../../core/entity/Entity';
import { IQOperableField } from '../../core/field/OperableField';
import { RawQuery } from './Query';
/**
 * All Non-Entity Queries are defined in this format.
 */
export interface RawNonEntityQuery extends RawQuery {
    from: IFrom[];
    groupBy?: IQOperableField<any, any, any, any>[];
    having?: JSONBaseOperation;
    limit?: number;
    offset?: number;
}
//# sourceMappingURL=NonEntityQuery.d.ts.map