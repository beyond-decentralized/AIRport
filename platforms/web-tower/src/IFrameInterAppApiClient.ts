import {
    IInterAppAPIClient,
    Inject,
    Injected
} from '@airport/direction-indicator'
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
import { ApiClientSubject } from '@airport/autopilot';
import { IApplicationStore } from '@airport/tower';
import { Observable, Subscription } from 'rxjs';
import { v4 as guidv4 } from "uuid";
import { Message_Direction, Message_Leg, Message_Type, IApiCallRequestMessage } from '@airport/aviation-communication';

export interface IRequestRecord {
    request: IApiCallRequestMessage
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
                request: IApiCallRequestMessage
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

        const request: IApiCallRequestMessage = {
            args: serializedParams,
            clientApplication: this.applicationStore.state.application,
            clientDomain: this.applicationStore.state.domain,
            clientDomainProtocol: location.protocol,
            direction: Message_Direction.FROM_CLIENT,
            id: guidv4(),
            messageLeg: Message_Leg.TO_HUB,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface,
            serverApplication: fullDiDescriptor.application.name,
            serverDomain: fullDiDescriptor.application.domain.name,
            serverDomainProtocol: 'https',
            type: Message_Type.API_CALL
        }

        if (isObservable) {
            request.type = Message_Type.API_SUBSCRIBE
            const subject = new ApiClientSubject<ReturnType>(args, request,
                fullDiDescriptor, this.applicationStore.state.subjectCache)

            return subject
        }

        return this.doInvokeApiMethod(request, args)
    }

    async doInvokeApiMethod<ReturnType>(
        request: IApiCallRequestMessage,
        args: any[]
    ): Promise<ReturnType> {
        let response
        switch(request.type) {
            case Message_Type.API_SUBSCRIBE:
            case Message_Type.API_UNSUBSCRIBE:
            case Message_Type.API_SUBSCRIBTION_DATA: {
                await this.transactionalConnector.callApiNoReturn(request)
                return
            }
            default: {
                response = await this.transactionalConnector.callApi(request)
                break
            }
        }
        
        let returnedValue
        if (_inWebMode) {
            returnedValue = response.returnedValue
        } else {
            if (response.returnedValue) {
                returnedValue = this.queryResultsDeserializer
                    .deserialize(response.returnedValue)
            }
        }

        if (returnedValue) {
            this.queryResultsDeserializer.setPropertyDescriptors(returnedValue, new Set())
        }

        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i], new Map())
        }

        return returnedValue
    }


}
