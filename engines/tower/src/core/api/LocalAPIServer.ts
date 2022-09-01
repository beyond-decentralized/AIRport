import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ILocalAPIRequest,
    ILocalAPIResponse,
    LocalApiRequestCategoryType
} from "@airport/aviation-communication";
import { IApiRegistry, IApplicationApi } from "@airport/check-in";
import {
    IApplicationStore,
    ILocalAPIServer
} from "@airport/apron";
import { Actor } from '@airport/holding-pattern';
import { RequestManager } from '@airport/arrivals-n-departures';

@Injected()
export class LocalAPIServer
    implements ILocalAPIServer {

    @Inject()
    apiRegistry: IApiRegistry

    @Inject()
    applicationStore: IApplicationStore

    @Inject()
    requestManager: RequestManager

    async handleRequest(
        request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>
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
        request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>,
        api: IApplicationApi
    ): Promise<ReturnType> {
        const {
            apiObject,
            apiOperation
        } = await this.apiRegistry.findObjectAndOperationForApi(api,
            request.domain, request.application, request.objectName, request.methodName)

        const result = apiObject[request.methodName].apply(apiObject, request.args)
        if (apiOperation.isAsync) {
            return await result
        } else {
            return result
        }
    }


}
