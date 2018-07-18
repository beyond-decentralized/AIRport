"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Field_1 = require("./Field");
/**
 * Created by Papa on 11/29/2016.
 */
class QNullFunction extends Field_1.QField {
    constructor(utils) {
        super(null, null, null, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION, utils);
        this.value = null;
    }
    getInstance() {
        return this.copyFunctions(new QNullFunction(this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        return this.operableFunctionToJson(this, columnAliases, forSelectClause);
    }
}
exports.QNullFunction = QNullFunction;
//# sourceMappingURL=NullFunction.js.map