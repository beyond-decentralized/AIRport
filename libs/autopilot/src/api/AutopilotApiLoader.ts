import {
    AUTOPILOT_API_LOADER,
    DEPENDENCY_INJECTION,
    IAutopilotApiLoader,
    IDependencyInjectionToken,
    IOC
} from '@airport/direction-indicator'
import { ILocalAPIClient } from '../LocalAPIClient';
import { LOCAL_API_CLIENT } from '../tokens';

export class AutopilotApiLoader
    implements IAutopilotApiLoader {

    localApiClient: ILocalAPIClient

    loadApiAutopilot<T>(
        token: IDependencyInjectionToken<T>
    ): T {
        return new Proxy({}, {
            get(target, methodName: string) {
                switch (methodName) {
                    case '__initialized__':
                        return true
                    case 'then':
                        return target
                }
                return function (...args) {
                    return this.localApiClient.invokeApiMethod(
                        token, methodName, args);
                };
            }
        }) as T;
    }
}
DEPENDENCY_INJECTION.set(AUTOPILOT_API_LOADER, AutopilotApiLoader)
AUTOPILOT_API_LOADER.setDependencies({
    localApiClient: LOCAL_API_CLIENT
})