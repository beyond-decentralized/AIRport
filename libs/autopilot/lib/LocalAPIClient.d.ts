import { ILocalAPIRequest } from "@airport/aviation-communication";
import { IDependencyInjectionToken } from "@airport/direction-indicator";
import { IOperationSerializer, IQueryResultsDeserializer } from "@airport/pressurization";
export interface ILocalAPIClient {
    invokeApiMethod<T = any>(token: IDependencyInjectionToken<T>, methodName: string, args: any[]): Promise<void>;
    onMessage(callback: (message: any) => void): any;
}
export interface IRequestRecord {
    request: ILocalAPIRequest;
    reject: any;
    resolve: any;
}
export declare class LocalAPIClient implements ILocalAPIClient {
    operationSerializer: IOperationSerializer;
    queryResultsDeserializer: IQueryResultsDeserializer;
    pendingDemoMessageMap: Map<string, IRequestRecord>;
    demoListenerStarted: boolean;
    connectionReady: boolean;
    clientIframe: HTMLIFrameElement;
    messageCallback: (message: any) => void;
    init(): void;
    private initializeForWeb;
    onMessage(callback: (message: any) => void): void;
    private hasValidApplicationInfo;
    invokeApiMethod<T>(token: IDependencyInjectionToken<T>, methodName: string, args: any[]): Promise<any>;
    private wait;
    private isConnectionReady;
    private sendLocalRequest;
    private sendDemoRequest;
    private startDemoListener;
    private handleDemoResponse;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map