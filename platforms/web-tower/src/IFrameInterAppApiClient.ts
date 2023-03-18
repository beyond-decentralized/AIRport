import {
    IInterAppAPIClient,
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ICoreLocalApiRequest,
    ILocalAPIRequest,
    IObservableCoreLocalAPIRequest,
    IObservableLocalAPIRequest,
    SubscriptionOperation
} from "@airport/aviation-communication";
import {
    IFullDITokenDescriptor
} from "@airport/direction-indicator";
import {
    ITransactionalConnector
} from "@airport/ground-control";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";
import { SubscriptionCountSubject } from '@airport/autopilot';
import { Observable, Subscription } from 'rxjs';
import { IApplicationStore } from '@airport/tower';


export interface IRequestRecord {
    request: ILocalAPIRequest
    reject
    resolve
}

const _inWebMode = true

@Injected()
export class IFrameInterAppAPIClient
    implements IInterAppAPIClient {

    @Inject()
    applicationStore: IApplicationStore

    @Inject()
    operationSerializer: IOperationSerializer

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    @Inject()
    transactionalConnector: ITransactionalConnector

    messageBusSubscription: Subscription

    init() {
        this.messageBusSubscription = globalThis.MESSAGE_BUS.subscribe(async (
            message: {
                args: any[],
                fullDIDescriptor: IFullDITokenDescriptor,
                request: IObservableLocalAPIRequest
            }) => {

            await this.doInvokeApiMethod(
                message.request,
                message.args
            );
        })
    }

    invokeApiMethod<ReturnType>(
        fullDiDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[],
        isObservable: boolean
    ): Promise<ReturnType> | Observable<ReturnType> {
        let serializedParams
        if (_inWebMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: ICoreLocalApiRequest = {
            application: fullDiDescriptor.application.name,
            args: serializedParams,
            domain: fullDiDescriptor.application.domain.name,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface
        }

        if (isObservable) {
            (request as IObservableCoreLocalAPIRequest).subscriptionOperation
                = SubscriptionOperation.OPERATION_SUBSCRIBE
            const subject = new SubscriptionCountSubject<ReturnType>(args, request,
                fullDiDescriptor, this.applicationStore.state.observableApiRequestMap)

            return subject
        }

        return this.doInvokeApiMethod(request, args)
    }

    async doInvokeApiMethod<ReturnType>(
        request: ICoreLocalApiRequest,
        args: any[]
    ): Promise<ReturnType> {
        const response = await this.transactionalConnector.callApi(request)

        let payload
        if (_inWebMode) {
            payload = response.payload
        } else {
            if (response.payload) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.payload)
            }
        }

        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload, new Set())
        }

        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i], new Map())
        }

        return payload
    }


}
