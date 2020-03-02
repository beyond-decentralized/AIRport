"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Operation_1 = require("./Operation");
/**
 * Created by Papa on 6/20/2016.
 */
class BooleanOperation extends Operation_1.ValueOperation {
    constructor() {
        super(ground_control_1.OperationCategory.BOOLEAN);
    }
}
exports.BooleanOperation = BooleanOperation;
//# sourceMappingURL=BooleanOperation.js.map