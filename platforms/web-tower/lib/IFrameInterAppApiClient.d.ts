import { IInterAppAPIClient } from '@airport/direction-indicator';
import { ILocalAPIRequest } from "@airport/aviation-communication";
import { IDependencyInjectionToken } from "@airport/direction-indicator";
import { ITransactionalConnector } from "@airport/ground-control";
import { IOperationSerializer, IQueryResultsDeserializer } from "@airport/pressurization";
export interface IRequestRecord {
    request: ILocalAPIRequest;
    reject: any;
    resolve: any;
}
export declare class IFrameInterAppPIClient implements IInterAppAPIClient {
    operationSerializer: IOperationSerializer;
    queryResultsDeserializer: IQueryResultsDeserializer;
    transactionalConnector: ITransactionalConnector;
    invokeApiMethod<ApiInterface, ReturnValue>(token: IDependencyInjectionToken<ApiInterface>, methodName: string, args: any[]): Promise<ReturnValue>;
}
//# sourceMappingURL=IFrameInterAppApiClient.d.ts.map