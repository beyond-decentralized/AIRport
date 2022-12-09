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

    lastCallMillisMap: Map<IDependencyInjectionToken<any>, Map<string, number>> = new Map()

    loadApiAutopilot<T>(
        token: IDependencyInjectionToken<T>
    ): T {
        if (!this.lastCallMillisMap.has(token)) {
            this.lastCallMillisMap.set(token, new Map())
        }
        let _this = this
        return new Proxy({}, {
            get(target, methodName: string) {
                let mapForToken = _this.lastCallMillisMap.get(token)
                if (!mapForToken.has(methodName)) {
                    mapForToken.set(methodName, 0)
                }
                switch (methodName) {
                    case '__initialized__':
                        return true
                    case 'then':
                        return target
                }
                return function (...args) {
                    const nowMillis = new Date().getTime()
                    if (mapForToken.get(methodName) + 300 > nowMillis) {
                        throw new Error(`
    ${token.descriptor.interface}.${methodName}
    Double submitting a request in rapid succession,
    please prevent double submission in UI code`)
                    }
                    mapForToken.set(methodName, nowMillis)
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
