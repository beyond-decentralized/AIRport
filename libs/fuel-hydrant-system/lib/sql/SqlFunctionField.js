"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlFunctionField {
    constructor(jsonClauseField) {
        this.jsonClauseField = jsonClauseField;
        // Test
    }
    getValue(sqlValueProvider) {
        return sqlValueProvider.getFieldFunctionValue(this.jsonClauseField);
    }
}
exports.SqlFunctionField = SqlFunctionField;
//# sourceMappingURL=SqlFunctionField.js.map