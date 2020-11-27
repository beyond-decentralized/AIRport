export class SqlFunctionField {
    constructor(jsonClauseField) {
        this.jsonClauseField = jsonClauseField;
        // Test
    }
    getValue(sqlValueProvider, context) {
        return sqlValueProvider.getFieldFunctionValue(this.jsonClauseField, null, context);
    }
}
//# sourceMappingURL=SqlFunctionField.js.map