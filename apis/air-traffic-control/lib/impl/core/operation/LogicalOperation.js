import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { Operation } from "./Operation";
/**
 * Created by Papa on 4/21/2016.
 */
export const and = function (...ops) {
    return new LogicalOperation().and(ops);
};
export const or = function (...ops) {
    return new LogicalOperation().or(ops);
};
export const not = function (op) {
    return new LogicalOperation().not(op);
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
    and(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.AND,
            v: ops
        };
    }
    or(ops) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.OR,
            v: ops
        };
    }
    not(op) {
        return {
            c: OperationCategory.LOGICAL,
            o: SqlOperator.NOT,
            v: op
        };
    }
}
//# sourceMappingURL=LogicalOperation.js.map