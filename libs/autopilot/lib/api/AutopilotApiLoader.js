import { AUTOPILOT_API_LOADER, DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { LOCAL_API_CLIENT } from '../tokens';
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
DEPENDENCY_INJECTION.set(AUTOPILOT_API_LOADER, AutopilotApiLoader);
AUTOPILOT_API_LOADER.setDependencies({
    localApiClient: LOCAL_API_CLIENT
});
//# sourceMappingURL=AutopilotApiLoader.js.map