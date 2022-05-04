import { SqlOperator } from "@airport/ground-control";
/**
 * Created by Papa on 4/21/2016.
 */
export class Operation {
    constructor(category) {
        this.category = category;
    }
}
export class ValueOperation extends Operation {
    constructor(category) {
        super(category);
        this.category = category;
    }
    equals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.EQUALS,
            r: rValue
        };
    }
    greaterThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.GREATER_THAN,
            r: rValue
        };
    }
    greaterThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.GREATER_THAN_OR_EQUALS,
            r: rValue
        };
    }
    isNotNull(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IS_NOT_NULL
        };
    }
    isNull(lValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IS_NULL
        };
    }
    in(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.IN,
            r: rValue
        };
    }
    lessThan(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LESS_THAN,
            r: rValue
        };
    }
    lessThanOrEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LESS_THAN_OR_EQUALS,
            r: rValue
        };
    }
    notEquals(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.NOT_EQUALS,
            r: lValue
        };
    }
    notIn(lValue, rValue) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.NOT_IN,
            r: rValue
        };
    }
}
//# sourceMappingURL=Operation.js.map