import { IAutopilotApiLoader, IDependencyInjectionToken, IInterAppAPIClient } from '@airport/direction-indicator';
import { ILocalAPIClient } from '../LocalAPIClient';
export declare class AutopilotApiLoader implements IAutopilotApiLoader {
    interAppApiClient: IInterAppAPIClient;
    localApiClient: ILocalAPIClient;
    loadApiAutopilot<T>(token: IDependencyInjectionToken<T>): T;
}
//# sourceMappingURL=AutopilotApiLoader.d.ts.map