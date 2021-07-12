import {
    AUTOPILOT_DAO_LOADER,
    DI,
    IAutopilotDaoLoader,
    IOC
} from '@airport/di'
import { LOCAL_API_CLIENT } from '../tokens';

export class AutopilotDaoLoader
    implements IAutopilotDaoLoader {

    loadDaoAutopilot<T>(
        daoName: string
    ): T {
        return new Proxy({}, {
            get(target, methodName: string) {
                return function (...args) {
                    return IOC.getSync(LOCAL_API_CLIENT)
                        .invokeDaoMethod(daoName, methodName, args);
                };
            }
        }) as T;
    }
}
DI.set(AUTOPILOT_DAO_LOADER, AutopilotDaoLoader)
