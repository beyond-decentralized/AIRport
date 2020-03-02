"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const StringOperation_1 = require("../operation/StringOperation");
const OperableField_1 = require("./OperableField");
class QStringField extends OperableField_1.QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = ground_control_1.JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new StringOperation_1.StringOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QStringField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
exports.QStringField = QStringField;
class QStringFunction extends QStringField {
    constructor(value, isQueryParameter = false) {
        super({ type: ground_control_1.SQLDataType.STRING }, null, null, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QStringFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
exports.QStringFunction = QStringFunction;
//# sourceMappingURL=StringField.js.map