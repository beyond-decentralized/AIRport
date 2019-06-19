"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlFunctionField {
    constructor(jsonClauseField) {
        this.jsonClauseField = jsonClauseField;
        // Test
    }
    getValue(sqlValueProvider, airDb, schemaUtils, metadataUtils) {
        return sqlValueProvider.getFieldFunctionValue(this.jsonClauseField, null, airDb, schemaUtils, metadataUtils);
    }
}
exports.SqlFunctionField = SqlFunctionField;
//# sourceMappingURL=SqlFunctionField.js.map