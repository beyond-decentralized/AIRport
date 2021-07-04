export function getAutopilotDao() {
    return new Proxy({}, {
        get(target, methodKey) {
            return function (...args) {
                console.log(methodKey + JSON.stringify(args)
                    + ' -> ' + JSON.stringify(null));
                return null;
            };
        }
    });
}
//# sourceMappingURL=DaoAutopilot.js.map