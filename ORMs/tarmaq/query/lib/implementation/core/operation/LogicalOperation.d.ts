import { JSONBaseOperation } from "@airport/ground-control";
import { andOperator, ILogicalOperation, JSONLogicalOperation, notOperator, orOperator } from "../../../definition/core/operation/LogicalOperation";
import { IOperation } from "../../../definition/core/operation/Operation";
import { Operation } from "./Operation";
/**
 * Created by Papa on 4/21/2016.
 */
export declare const AND: andOperator;
export declare const OR: orOperator;
export declare const NOT: notOperator;
export declare class LogicalOperation extends Operation implements ILogicalOperation {
    constructor();
    static verifyChildOps(ops: IOperation[]): void;
    AND(ops: JSONBaseOperation[]): JSONLogicalOperation;
    OR(ops: JSONBaseOperation[]): JSONLogicalOperation;
    NOT(op: JSONBaseOperation): JSONLogicalOperation;
}
//# sourceMappingURL=LogicalOperation.d.ts.map