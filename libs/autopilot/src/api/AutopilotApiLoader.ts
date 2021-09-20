import {
    AUTOPILOT_API_LOADER,
    DI,
    IAutopilotApiLoader,
    IOC
} from '@airport/di'
import { LOCAL_API_CLIENT } from '../tokens';

export class AutopilotApiLoader
    implements IAutopilotApiLoader {

    loadApiAutopilot<T>(
        schemaSignature: string,
        daoName: string
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
                        .invokeApiMethod(schemaSignature, daoName, methodName, args);
                };
            }
        }) as T;
    }
}
DI.set(AUTOPILOT_API_LOADER, AutopilotApiLoader)
