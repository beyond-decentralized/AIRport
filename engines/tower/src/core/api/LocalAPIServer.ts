import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ILocalAPIRequest,
    ILocalAPIResponse,
    LocalApiRequestCategoryType
} from "@airport/aviation-communication";
import { IApiCallContext, ILocalAPIServer, ITransactionContext } from '@airport/terminal-map';
import { IQueryResultsDeserializer } from '@airport/pressurization'
import { IActor } from '@airport/ground-control';
import { IApplicationStore } from '../../state/ApplicationStore';
import { IApiRegistry, IApplicationApi } from '@airport/air-traffic-control';
import { RequestManager } from './RequestManager';

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
        request: ILocalAPIRequest<LocalApiRequestCategoryType, IActor>
    ): Promise<ILocalAPIResponse> {

        let payload
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

            payload = await this.coreHandleRequest(request, this.applicationStore.state.api)
        } catch (e) {
            errorMessage = e.message ? e.message : e
            console.error(e)
        }

        const response: ILocalAPIResponse = {
            application: request.application,
            args: request.args,
            category: 'ToClient',
            domain: request.domain,
            errorMessage,
            id: request.id,
            hostDomain: request.hostDomain,
            hostProtocol: request.hostProtocol,
            methodName: request.methodName,
            objectName: request.objectName,
            protocol: request.protocol,
            payload,
            transactionId: request.transactionId
        }

        return response
    }

    async coreHandleRequest<ReturnType = any>(
        request: ILocalAPIRequest<LocalApiRequestCategoryType, IActor>,
        api: IApplicationApi,
        context?: IApiCallContext & ITransactionContext
    ): Promise<ReturnType> {
        const {
            apiObject,
            apiOperation
        } = await this.apiRegistry.findObjectAndOperationForApi(api,
            request.domain, request.application, request.objectName, request.methodName)

        let args = request.args as any
        if (context) {
            args = [...request.args, context]
        }

        if (request.args.length > apiOperation.parameters.length) {
            throw new Error(`
    Too many parameters passed in to @Api() request
Domain:      ${request.domain}
Application: ${request.application}
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

        const result = apiObject[request.methodName].apply(apiObject, [...request.args, context])
        if (apiOperation.isAsync) {
            return await result
        } else {
            return result
        }
    }


}
