import { AUTOPILOT_API_LOADER, DI, IOC } from '@airport/di';
import { LOCAL_API_CLIENT } from '../tokens';
export class AutopilotApiLoader {
    loadApiAutopilot(applicationSignature, daoName) {
        return new Proxy({}, {
            get(target, methodName) {
                switch (methodName) {
                    case '__initialized__':
                        return true;
                    case 'then':
                        return target;
                }
                return function (...args) {
                    return IOC.getSync(LOCAL_API_CLIENT)
                        .invokeApiMethod(applicationSignature, daoName, methodName, args);
                };
            }
        });
    }
}
DI.set(AUTOPILOT_API_LOADER, AutopilotApiLoader);
//# sourceMappingURL=AutopilotApiLoader.js.map