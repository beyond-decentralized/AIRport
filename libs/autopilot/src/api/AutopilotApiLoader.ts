import {
    IAutopilotApiLoader,
    IFullDITokenDescriptor,
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

    lastCallMillisMap: Map<IFullDITokenDescriptor, Map<string, number>> = new Map()

    loadApiAutopilot<T>(
        fullDIDescriptor: IFullDITokenDescriptor
    ): T {
        if (!this.lastCallMillisMap.has(fullDIDescriptor)) {
            this.lastCallMillisMap.set(fullDIDescriptor, new Map())
        }
        let _this = this
        return new Proxy({}, {
            get(target, methodName: string) {
                let mapForToken = _this.lastCallMillisMap.get(fullDIDescriptor)
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
    ${fullDIDescriptor.descriptor.interface}.${methodName}
    Double submitting a request in rapid succession,
    please prevent double submission in UI code`)
                    }
                    mapForToken.set(methodName, nowMillis)
                    if (INTER_APP_API_CLIENT.getClass()) {
                        return _this.interAppApiClient.invokeApiMethod(
                            fullDIDescriptor, methodName, args);
                    } else {
                        return _this.localApiClient.invokeApiMethod(
                            fullDIDescriptor, methodName, args);
                    }
                };
            }
        }) as T;
    }
}
