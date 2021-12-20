import {
    AUTOPILOT_API_LOADER,
    DI,
    IAutopilotApiLoader,
    IDiToken,
    IOC
} from '@airport/di'
import { LOCAL_API_CLIENT } from '../tokens';

export class AutopilotApiLoader
    implements IAutopilotApiLoader {

    loadApiAutopilot<T>(
        token: IDiToken<T>
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
DI.set(AUTOPILOT_API_LOADER, AutopilotApiLoader)
