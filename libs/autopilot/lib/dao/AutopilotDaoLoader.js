import { AUTOPILOT_DAO_LOADER, DI, IOC } from '@airport/di';
import { LOCAL_API_CLIENT } from '../tokens';
export class AutopilotDaoLoader {
    loadDaoAutopilot(uniqueSchemaHash, daoName) {
        return new Proxy({}, {
            get(target, methodName) {
                return function (...args) {
                    return IOC.getSync(LOCAL_API_CLIENT)
                        .invokeDaoMethod(uniqueSchemaHash, daoName, methodName, args);
                };
            }
        });
    }
}
DI.set(AUTOPILOT_DAO_LOADER, AutopilotDaoLoader);
//# sourceMappingURL=AutopilotDaoLoader.js.map