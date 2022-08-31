import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ILocalAPIRequest,
    ILocalAPIResponse,
    LocalApiRequestCategoryType
} from "@airport/aviation-communication";
import { IApiRegistry } from "@airport/check-in";
import {
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
    requestManager: RequestManager

    async handleRequest(
        request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>
    ): Promise<ILocalAPIResponse> {

        let payload
        let errorMessage: string
        try {
            const {
                apiObject,
                apiOperation
            } = await this.apiRegistry.findApiObjectAndOperation(
                request.domain, request.application, request.objectName, request.methodName)

            this.requestManager.actor = request.actor
            this.requestManager.userAccount = request.actor.userAccount

            const result = apiObject[request.methodName].apply(apiObject, request.args)
            if (apiOperation.isAsync) {
                payload = await result
            } else {
                payload = result
            }
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


}
