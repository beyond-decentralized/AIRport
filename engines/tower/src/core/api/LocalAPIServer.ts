import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { IApiCallContext, ILocalAPIServer, ITransactionContext } from '@airport/terminal-map';
import { IQueryResultsDeserializer } from '@airport/pressurization'
import { IActor } from '@airport/ground-control';
import { IApplicationStore } from '../../state/ApplicationStore';
import { IApiRegistry, IApplicationApi } from '@airport/air-traffic-control';
import { RequestManager } from './RequestManager';
import { Message_Direction, IApiCallRequestMessage, IApiCallResponseMessage } from '@airport/aviation-communication';

@Injected()
export class LocalAPIServer
    implements ILocalAPIServer {

    @Inject()
    apiRegistry: IApiRegistry

    @Inject()
    applicationStore: IApplicationStore

    @Inject()
    requestManager: RequestManager

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    async handleRequest(
        request: IApiCallRequestMessage<IActor>
    ): Promise<IApiCallResponseMessage> {
        let internalResponse
        let errorMessage: string
        try {
            // TODO: this should be inside coreHandleRequest after retrieval
            // of apiOperation.  For that requestManager must be supported
            // by the main @airport/terminal. It works in App VMs since
            // a new requestManager object is created per request but
            // currently does not work in @airport/terminal (since there is
            // no per-request creating of injected objects).
            this.requestManager.actor = request.actor
            this.requestManager.userAccount = request.actor.userAccount

            internalResponse = await this.coreHandleRequest(request, this.applicationStore.state.api)
        } catch (e) {
            errorMessage = e.message ? e.message : e
            console.error(e)
        }

        const response: IApiCallResponseMessage = {
            ...request,
            direction: Message_Direction.TO_CLIENT,
            errorMessage,
            returnedValue: internalResponse.result
        }

        return response
    }

    async coreHandleRequest<ReturnType = any>(
        request: IApiCallRequestMessage<IActor>,
        api: IApplicationApi,
        context?: IApiCallContext & ITransactionContext
    ): Promise<{
        isAsync: boolean,
        result: ReturnType
    }> {
        const {
            apiObject,
            apiOperation
        } = await this.apiRegistry.findObjectAndOperationForApi(api,
            request.serverDomain, request.serverApplication, request.objectName, request.methodName)

        if (request.args.length > apiOperation.parameters.length) {
            throw new Error(`
    Too many parameters passed in to @Api() request
Domain:      ${request.serverDomain}
Application: ${request.serverApplication}
@Api()
${request.objectName}.${request.methodName}
`)
        }
        for (let i = 0; i < apiOperation.parameters.length - request.args.length; i++) {
            request.args.push(undefined)
        }

        for (let arg of request.args) {
            this.queryResultsDeserializer.setPropertyDescriptors(arg)
        }

        let result = apiObject[request.methodName].apply(apiObject, [...request.args, context])
        if (apiOperation.isAsync) {
            result = await result
        }

        return {
            isAsync: apiOperation.isAsync,
            result
        }
    }

}
