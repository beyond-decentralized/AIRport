import {
    AUTOPILOT_API_LOADER,
    DEPENDENCY_INJECTION,
    IAutopilotApiLoader,
    IDependencyInjectionToken,
    IOC
} from '@airport/direction-indicator'
import { LOCAL_API_CLIENT } from '../tokens';

export class AutopilotApiLoader
    implements IAutopilotApiLoader {

    loadApiAutopilot<T>(
        token: IDependencyInjectionToken<T>
    ): T {
        return new Proxy({}, {
            get(target, methodName: string) {
                switch(methodName) {
                    case '__initialized__':
                        return true
                    case 'then':
                        return target
                }
                return function (...args) {
                    return IOC.getSync(LOCAL_API_CLIENT)
                        .invokeApiMethod(token, methodName, args);
                };
            }
        }) as T;
    }
}
AUTOPILOT_API_LOADER.descriptor.class = AutopilotApiLoader
