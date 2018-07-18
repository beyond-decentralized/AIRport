"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Operation_1 = require("./Operation");
/**
 * Created by Papa on 6/20/2016.
 */
class StringOperation extends Operation_1.ValueOperation {
    constructor() {
        super(ground_control_1.OperationCategory.STRING);
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
exports.StringOperation = StringOperation;
//# sourceMappingURL=StringOperation.js.map