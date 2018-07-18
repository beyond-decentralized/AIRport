"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/21/2016.
 */
class Operation {
    constructor(category) {
        this.category = category;
    }
}
exports.Operation = Operation;
class ValueOperation extends Operation {
    constructor(category) {
        super(category);
        this.category = category;
    }
    equals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.EQUALS,
            r: rValue
        };
    }
    greaterThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.GREATER_THAN,
            r: rValue
        };
    }
    greaterThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.GREATER_THAN_OR_EQUALS,
            r: rValue
        };
    }
    isNotNull(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.IS_NOT_NULL
        };
    }
    isNull(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.IS_NULL
        };
    }
    in(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.IN,
            r: rValue
        };
    }
    lessThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.LESS_THAN,
            r: rValue
        };
    }
    lessThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.LESS_THAN_OR_EQUALS,
            r: rValue
        };
    }
    notEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.NOT_EQUALS,
            r: lValue
        };
    }
    notIn(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.NOT_IN,
            r: rValue
        };
    }
}
exports.ValueOperation = ValueOperation;
//# sourceMappingURL=Operation.js.map