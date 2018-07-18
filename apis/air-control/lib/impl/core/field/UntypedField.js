"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const UntypedOperation_1 = require("../operation/UntypedOperation");
const OperableField_1 = require("./OperableField");
class QUntypedField extends OperableField_1.QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = ground_control_1.JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new UntypedOperation_1.UntypedOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
exports.QUntypedField = QUntypedField;
class QUntypedFunction extends QUntypedField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: ground_control_1.SQLDataType.ANY }, null, null, utils, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QUntypedFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
exports.QUntypedFunction = QUntypedFunction;
//# sourceMappingURL=UntypedField.js.map