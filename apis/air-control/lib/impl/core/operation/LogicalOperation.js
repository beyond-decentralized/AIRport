"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Operation_1 = require("./Operation");
/**
 * Created by Papa on 4/21/2016.
 */
exports.and = function (...ops) {
    return new LogicalOperation().and(ops);
};
exports.or = function (...ops) {
    return new LogicalOperation().or(ops);
};
exports.not = function (op) {
    return new LogicalOperation().not(op);
};
class LogicalOperation extends Operation_1.Operation {
    constructor() {
        super(null);
    }
    static verifyChildOps(ops) {
        if (!ops || !ops.length) {
            throw `No child operations provided`;
        }
    }
    and(ops) {
        return {
            c: ground_control_1.OperationCategory.LOGICAL,
            o: ground_control_1.SqlOperator.AND,
            v: ops
        };
    }
    or(ops) {
        return {
            c: ground_control_1.OperationCategory.LOGICAL,
            o: ground_control_1.SqlOperator.OR,
            v: ops
        };
    }
    not(op) {
        return {
            c: ground_control_1.OperationCategory.LOGICAL,
            o: ground_control_1.SqlOperator.NOT,
            v: op
        };
    }
}
exports.LogicalOperation = LogicalOperation;
//# sourceMappingURL=LogicalOperation.js.map