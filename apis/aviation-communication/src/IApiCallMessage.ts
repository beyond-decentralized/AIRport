import { IApiMessage, ISubscriptionMessage } from "./IMessage"

export interface IApiCallRequestMessage<A = any>
    extends IApiMessage, IApiCallRequestMessageProperties<A> {
}
export interface IObservableApiCallRequestMessage<A = any>
    extends ISubscriptionMessage, IApiCallRequestMessageProperties<A> {
}

export interface IApiCallRequestMessageProperties<A = any> {
    actor?: A
    args: Array<boolean | number | string>
    methodName: string
    objectName: string
}

export interface IApiCallResponseMessage<A = any>
    extends IApiCallRequestMessage<A> {
    returnedValue?: any
}
