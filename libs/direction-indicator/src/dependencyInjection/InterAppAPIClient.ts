import { IFullDITokenDescriptor } from "./Token";

export interface IInterAppAPIClient {

    invokeApiMethod<ReturnValue>(
        token: IFullDITokenDescriptor,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue>

}
