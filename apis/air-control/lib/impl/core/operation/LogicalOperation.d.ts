import { JSONBaseOperation } from "@airport/ground-control";
import { andOperator, ILogicalOperation, JSONLogicalOperation, notOperator, orOperator } from "../../../lingo/core/operation/LogicalOperation";
import { IOperation } from "../../../lingo/core/operation/Operation";
import { Operation } from "./Operation";
/**
 * Created by Papa on 4/21/2016.
 */
export declare const and: andOperator;
export declare const or: orOperator;
export declare const not: notOperator;
export declare class LogicalOperation extends Operation implements ILogicalOperation {
    constructor();
    static verifyChildOps(ops: IOperation[]): void;
    and(ops: JSONBaseOperation[]): JSONLogicalOperation;
    or(ops: JSONBaseOperation[]): JSONLogicalOperation;
    not(op: JSONBaseOperation): JSONLogicalOperation;
}
//# sourceMappingURL=LogicalOperation.d.ts.map