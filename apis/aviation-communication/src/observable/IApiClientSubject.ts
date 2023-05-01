import { IFullDITokenDescriptor } from "@airport/direction-indicator"
import { ICoreSubscriptionRequestFields, ISubscriptionCountSubject } from "./ISubscriptionCountSubject"

export interface IApiClientSubject<T, RF extends ICoreSubscriptionRequestFields>
    extends ISubscriptionCountSubject<T, RF> {

    args: any[]
    fullDIDescriptor: IFullDITokenDescriptor
    subscriptionCount: number

}
