import { ILocalAPIRequest, ILocalAPIResponse, LocalApiRequestCategoryType } from "@airport/aviation-communication";
import { IApiRegistry, IApplicationApi } from "@airport/check-in";
import { IApplicationStore, ILocalAPIServer } from "@airport/apron";
import { Actor } from '@airport/holding-pattern';
import { RequestManager } from '@airport/arrivals-n-departures';
export declare class LocalAPIServer implements ILocalAPIServer {
    apiRegistry: IApiRegistry;
    applicationStore: IApplicationStore;
    requestManager: RequestManager;
    handleRequest(request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>): Promise<ILocalAPIResponse>;
    coreHandleRequest<ReturnType = any>(request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>, api: IApplicationApi): Promise<ReturnType>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map