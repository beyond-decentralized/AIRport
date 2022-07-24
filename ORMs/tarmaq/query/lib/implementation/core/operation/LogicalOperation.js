import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { Operation } from "./Operation";
/**
 * Created by Papa on 4/21/2016.
 */
export const AND = function (...ops) {
    return new LogicalOperation().AND(ops);
};
export const OR = function (...ops) {
    return new LogicalOperation().OR(ops);
};
export const NOT = function (op) {
    return new LogicalOperation().NOT(op);
};
export class LogicalOperation extends Operation {
    constructor() {
        super(null);
    }
    static verifyChildOps(ops) {
        if (!ops || !ops.length) {
            throw new Error(`No child operations provided`);
        }
    }
    AND(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.AND,
            v: ops
        };
    }
    OR(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.OR,
            v: ops
        };
    }
    NOT(op) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.NOT,
            v: op
        };
    }
}
//# sourceMappingURL=LogicalOperation.js.map