export class AutopilotApiLoader {
    loadApiAutopilot(token) {
        return new Proxy({}, {
            get(target, methodName) {
                switch (methodName) {
                    case '__initialized__':
                        return true;
                    case 'then':
                        return target;
                }
                return function (...args) {
                    return this.localApiClient.invokeApiMethod(token, methodName, args);
                };
            }
        });
    }
}
//# sourceMappingURL=AutopilotApiLoader.js.map