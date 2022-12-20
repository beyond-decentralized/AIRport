import { APIClient } from "../autopilot/IAutopilotApiLoader";
import { IFullDITokenDescriptor } from "./interfaces/Token";

export interface IInterAppAPIClient
    extends APIClient {

    invokeApiMethod<ReturnValue>(
        token: IFullDITokenDescriptor,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue>

}
