import {
    IApiClient,
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
import { Message_Leg, IApiCallRequestMessage, Message_OriginOrDestination_Type, Message_Type_Group, IObservableApiCallRequestMessage, SUBSCRIPTION_Message_Type, Message_Direction } from '@airport/aviation-communication';

export interface IRequestRecord {
    request: IApiCallRequestMessage
    reject
    resolve
}

const _inWebMode = true

@Injected()
export class IFrameInterAppAPIClient
    implements IApiClient {

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
            destination: {
                app: fullDiDescriptor.application.name,
                domain: fullDiDescriptor.application.domain.name,
                protocol: 'https:',
                type: Message_OriginOrDestination_Type.APPLICATION
            },
            direction: Message_Direction.REQUEST,
            id: guidv4(),
			isAIRportMessage: true,
            messageLeg: Message_Leg.TO_HUB,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface,
            origin: {
                app: this.applicationStore.state.application,
                domain: this.applicationStore.state.domain,
                protocol: location.protocol,
                type: Message_OriginOrDestination_Type.APPLICATION
            },
            typeGroup: Message_Type_Group.API
        }

        if (isObservable) {
            (request as IObservableApiCallRequestMessage).type = SUBSCRIPTION_Message_Type.API_SUBSCRIBE
            const subject = new ApiClientSubject<ReturnType, IApiCallRequestMessage>(args, request,
                fullDiDescriptor, this.applicationStore.state.clientSubjectCache)

            return subject
        }

        return this.doInvokeApiMethod(request, args)
    }

    async doInvokeApiMethod<ReturnType>(
        request: IApiCallRequestMessage,
        args: any[]
    ): Promise<ReturnType> {
        let response
        switch(request.typeGroup) {
            case Message_Type_Group.SUBSCRIPTION: {
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
