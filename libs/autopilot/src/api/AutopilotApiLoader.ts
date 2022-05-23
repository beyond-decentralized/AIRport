import {
    IAutopilotApiLoader,
    IDependencyInjectionToken,
    IInterAppAPIClient,
    Inject,
    Injected,
    INTER_APP_API_CLIENT
} from '@airport/direction-indicator'
import { ILocalAPIClient } from '../LocalAPIClient';

@Injected()
export class AutopilotApiLoader
    implements IAutopilotApiLoader {

    @Inject()
    interAppApiClient: IInterAppAPIClient

    @Inject()
    localApiClient: ILocalAPIClient

    loadApiAutopilot<T>(
        token: IDependencyInjectionToken<T>
    ): T {
        let _this = this
        return new Proxy({}, {
            get(target, methodName: string) {
                switch (methodName) {
                    case '__initialized__':
                        return true
                    case 'then':
                        return target
                }
                return function (...args) {
                    if (INTER_APP_API_CLIENT.getClass()) {
                        return _this.interAppApiClient.invokeApiMethod(
                            token, methodName, args);
                    } else {
                        return _this.localApiClient.invokeApiMethod(
                            token, methodName, args);
                    }
                };
            }
        }) as T;
    }
}
