import { AUTOPILOT_API_LOADER, DI, IOC } from '@airport/di';
import { LOCAL_API_CLIENT } from '../tokens';
export class AutopilotApiLoader {
    loadApiAutopilot(uniqueSchemaHash, daoName) {
        return new Proxy({}, {
            get(target, methodName) {
                return function (...args) {
                    return IOC.getSync(LOCAL_API_CLIENT)
                        .invokeApiMethod(uniqueSchemaHash, daoName, methodName, args);
                };
            }
        });
    }
}
DI.set(AUTOPILOT_API_LOADER, AutopilotApiLoader);
//# sourceMappingURL=AutopilotApiLoader.js.map