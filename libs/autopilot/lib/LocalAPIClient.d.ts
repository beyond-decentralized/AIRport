import { ILocalAPIRequest } from "@airport/aviation-communication";
import { IDiToken } from "@airport/di";
export interface ILocalAPIClient {
    invokeApiMethod<T = any>(token: IDiToken<T>, methodName: string, args: any[]): Promise<void>;
    onMessage(callback: (message: any) => void): any;
}
export interface IRequestRecord {
    request: ILocalAPIRequest;
    reject: any;
    resolve: any;
}
export declare class LocalAPIClient implements ILocalAPIClient {
    pendingDemoMessageMap: Map<string, IRequestRecord>;
    demoListenerStarted: boolean;
    connectionReady: boolean;
    clientIframe: HTMLIFrameElement;
    messageCallback: (message: any) => void;
    constructor();
    onMessage(callback: (message: any) => void): void;
    private hasValidApplicationInfo;
    invokeApiMethod<T>(token: IDiToken<T>, methodName: string, args: any[]): Promise<any>;
    private wait;
    private isConnectionReady;
    private sendLocalRequest;
    private sendDemoRequest;
    private startDemoListener;
    private handleDemoResponse;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map