export class AbstractFunctionAdaptor {
    getFunctionCalls(clause, innerValue, qEntityMapByAlias, airDb, schemaUtils, metadataUtils, sqlValueProvider) {
        clause.af.forEach((appliedFunction) => {
            innerValue = this.getFunctionCall(appliedFunction, innerValue, qEntityMapByAlias, airDb, schemaUtils, metadataUtils, sqlValueProvider);
        });
        return innerValue;
    }
}
//# sourceMappingURL=SQLQueryAdaptor.js.map