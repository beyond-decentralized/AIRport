import { IMessage } from "./IMessage"

export interface IApiCallRequestMessage<A = any>
    extends IMessage {
    actor?: A
    args: Array<boolean | number | string>
    methodName: string
    objectName: string
}

export interface IApiCallResponseMessage<A = any>
    extends IApiCallRequestMessage<A> {
    returnedValue?: any
}
