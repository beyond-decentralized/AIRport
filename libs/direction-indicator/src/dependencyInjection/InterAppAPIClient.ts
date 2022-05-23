import { IDependencyInjectionToken } from "./Token";

export interface IInterAppAPIClient {

    invokeApiMethod<ApiInterface, ReturnValue>(
        token: IDependencyInjectionToken<ApiInterface>,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue>

}
