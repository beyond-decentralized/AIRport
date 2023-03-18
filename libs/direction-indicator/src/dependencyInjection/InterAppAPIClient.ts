import { Observable } from 'rxjs'
import { IFullDITokenDescriptor } from "./interfaces/Token";

export interface IInterAppAPIClient {

    invokeApiMethod<ReturnValue>(
        token: IFullDITokenDescriptor,
        methodName: string,
        args: any[],
        isObservable: boolean
    ): Promise<ReturnValue> | Observable<ReturnValue>

}
