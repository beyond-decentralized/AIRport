"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const DateOperation_1 = require("../operation/DateOperation");
const OperableField_1 = require("./OperableField");
class QDateField extends OperableField_1.QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = ground_control_1.JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new DateOperation_1.DateOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QDateField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
exports.QDateField = QDateField;
class QDateFunction extends QDateField {
    constructor(value, isQueryParameter = false) {
        super({ type: ground_control_1.SQLDataType.DATE }, null, null, ground_control_1.JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QDateFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
exports.QDateFunction = QDateFunction;
//# sourceMappingURL=DateField.js.map