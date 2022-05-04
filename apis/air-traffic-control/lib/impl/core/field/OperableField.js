import { QField } from "./Field";
/**
 * Created by Papa on 10/25/2016.
 */
export class QOperableField extends QField {
    constructor(dbColumn, dbProperty, q, objectType, operation) {
        super(dbColumn, dbProperty, q, objectType);
        this.operation = operation;
    }
    equals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.equals(this, value);
    }
    greaterThan(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.greaterThan(this, value);
    }
    greaterThanOrEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.greaterThanOrEquals(this, value);
    }
    isNotNull() {
        return this.operation.isNotNull(this);
    }
    isNull() {
        return this.operation.isNull(this);
    }
    in(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.in(this, value);
    }
    lessThan(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.lessThan(this, value);
    }
    lessThanOrEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.lessThanOrEquals(this, value);
    }
    notEquals(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.notEquals(this, value);
    }
    notIn(values) {
        values = values.map((value) => {
            if (value instanceof Function) {
                return value();
            }
            return value;
        });
        return this.operation.notIn(this, values);
    }
}
//# sourceMappingURL=OperableField.js.map