import { ILocalAPIRequest, ILocalAPIResponse, LocalApiRequestCategoryType } from "@airport/aviation-communication";
import { IApiRegistry } from "@airport/check-in";
import { ILocalAPIServer } from "@airport/apron";
import { Actor } from '@airport/holding-pattern';
import { RequestManager } from '@airport/arrivals-n-departures';
export declare class LocalAPIServer implements ILocalAPIServer {
    apiRegistry: IApiRegistry;
    requestManager: RequestManager;
    handleRequest(request: ILocalAPIRequest<LocalApiRequestCategoryType, Actor>): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map