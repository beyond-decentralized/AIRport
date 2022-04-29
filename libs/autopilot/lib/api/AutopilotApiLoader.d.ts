import { IAutopilotApiLoader, IDependencyInjectionToken } from '@airport/direction-indicator';
import { ILocalAPIClient } from '../LocalAPIClient';
export declare class AutopilotApiLoader implements IAutopilotApiLoader {
    localApiClient: ILocalAPIClient;
    loadApiAutopilot<T>(token: IDependencyInjectionToken<T>): T;
}
//# sourceMappingURL=AutopilotApiLoader.d.ts.map