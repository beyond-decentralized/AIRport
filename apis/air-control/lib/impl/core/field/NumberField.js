"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const NumberOperation_1 = require("../operation/NumberOperation");
const OperableField_1 = require("./OperableField");
class QNumberField extends OperableField_1.QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = ground_control_1.JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new NumberOperation_1.NumberOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
}
exports.QNumberField = QNumberField;
class QNumberFunction extends QNumberField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: ground_control_1.SQLDataType.NUMBER }, null, null, utils, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QNumberFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
exports.QNumberFunction = QNumberFunction;
//# sourceMappingURL=NumberField.js.map