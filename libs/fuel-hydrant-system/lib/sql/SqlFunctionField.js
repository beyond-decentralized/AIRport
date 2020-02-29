export class SqlFunctionField {
    constructor(jsonClauseField) {
        this.jsonClauseField = jsonClauseField;
        // Test
    }
    getValue(sqlValueProvider, airDb, schemaUtils, metadataUtils) {
        return sqlValueProvider.getFieldFunctionValue(this.jsonClauseField, null, airDb, schemaUtils, metadataUtils);
    }
}
//# sourceMappingURL=SqlFunctionField.js.map