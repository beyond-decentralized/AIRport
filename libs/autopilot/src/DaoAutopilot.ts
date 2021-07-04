
export function getAutopilotDao(): any {
    return new Proxy({}, {
        get(target, methodKey: string) {
            return function (...args) {
                console.log(methodKey + JSON.stringify(args)
                    + ' -> ' + JSON.stringify(null));
                return null;
            };
        }
    });
}
