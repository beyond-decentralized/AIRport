"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const BooleanOperation_1 = require("../operation/BooleanOperation");
const OperableField_1 = require("./OperableField");
class QBooleanField extends OperableField_1.QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = ground_control_1.JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new BooleanOperation_1.BooleanOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
exports.QBooleanField = QBooleanField;
class QBooleanFunction extends QBooleanField {
    constructor(value, isQueryParameter = false) {
        super({ type: ground_control_1.SQLDataType.BOOLEAN }, null, null, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QBooleanFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
exports.QBooleanFunction = QBooleanFunction;
//# sourceMappingURL=BooleanField.js.map