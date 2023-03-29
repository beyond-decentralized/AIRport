import { Message_Type, IApiCallRequestMessage } from "@airport/aviation-communication";
import { IFullDITokenDescriptor } from "@airport/direction-indicator";
import { Subject } from "rxjs";
import { v4 as guidv4 } from 'uuid'
import { SubscriptionCountSubject } from "./SubscriptionCountSubject";

export class ApiClientSubject<T>
    extends SubscriptionCountSubject<T> {

    subscriptionCount = 0

    subscriptionId = guidv4()

    request: IApiCallRequestMessage

    constructor(
        public args: any[],
        request: IApiCallRequestMessage,
        public fullDIDescriptor: IFullDITokenDescriptor,
        public observableRequestMap: Map<string, Subject<any>>
    ) {
        super(() => {
            this.observableRequestMap.set(this.subscriptionId, this)
            globalThis.MESSAGE_BUS.next({
                args: this.args,
                fullDIDescriptor: this.fullDIDescriptor,
                request: {
                    ...this.request,
                    id: guidv4(),
                    type: Message_Type.API_SUBSCRIBE
                }
            })
        }, () => {
            this.observableRequestMap.delete(this.subscriptionId)
            globalThis.MESSAGE_BUS.next({
                fullDIDescriptor: this.fullDIDescriptor,
                request: {
                    ...this.request,
                    id: guidv4(),
                    type: Message_Type.API_UNSUBSCRIBE
                }
            })
        });
        request.subscriptionId = this.subscriptionId

        this.request = {
            ...request,
            subscriptionId: this.subscriptionId
        }
    }

}
