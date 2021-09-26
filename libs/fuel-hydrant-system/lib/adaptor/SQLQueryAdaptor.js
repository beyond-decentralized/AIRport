export class AbstractFunctionAdaptor {
    getFunctionCalls(clause, innerValue, qEntityMapByAlias, sqlValueProvider, context) {
        clause.appliedFunctions.forEach((appliedFunction) => {
            innerValue = this.getFunctionCall(appliedFunction, innerValue, qEntityMapByAlias, sqlValueProvider, context);
        });
        return innerValue;
    }
}
//# sourceMappingURL=SQLQueryAdaptor.js.map