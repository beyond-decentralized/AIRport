import { IFullDITokenDescriptor } from "../dependencyInjection/interfaces/Token";

export interface APIClient {

    invokeApiMethod<T = any>(
        fullDIDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[]
    ): Promise<T | void>

}

export interface IAutopilotApiLoader {

    apiClient: APIClient

    loadApiAutopilot(
        token: IFullDITokenDescriptor
    ): any;

}