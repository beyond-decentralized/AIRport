import { JSONBaseOperation } from "@airport/ground-control";
import { IFrom } from './Entity';
/**
 * The X in the JOIN ... ON X clause.
 */
export interface JoinOperation<IF extends IFrom> {
    (entity: IF): JSONBaseOperation;
}
/**
 * The JOIN ... ON X clause.
 */
export interface IJoinFields<IF extends IFrom> {
    on(joinOperation: JoinOperation<IF>): IF;
}
//# sourceMappingURL=Joins.d.ts.map