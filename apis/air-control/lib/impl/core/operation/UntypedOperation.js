"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Operation_1 = require("./Operation");
/**
 * Created by papa on 7/13/17.
 */
class UntypedOperation extends Operation_1.ValueOperation {
    constructor() {
        super(ground_control_1.OperationCategory.UNTYPED);
    }
    like(lValue, rValue
    // TODO: implement ReqExp
    //| RegExp
    ) {
        return {
            c: this.category,
            l: lValue,
            o: ground_control_1.SqlOperator.LIKE,
            r: rValue
        };
    }
}
exports.UntypedOperation = UntypedOperation;
//# sourceMappingURL=UntypedOperation.js.map