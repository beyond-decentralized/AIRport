import { IFullDITokenDescriptor } from "@airport/direction-indicator"
import { IApiCallRequestMessage } from "../IApiCallMessage"
import { ISubscriptionCountSubject } from "./ISubscriptionCountSubject"

export interface IApiClientSubject<T>
    extends ISubscriptionCountSubject<T> {

    args: any[]
    fullDIDescriptor: IFullDITokenDescriptor
    subscriptionCount: number
    subscriptionId: string
    request: IApiCallRequestMessage

}
