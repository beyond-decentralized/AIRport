import { ILocalAPIRequest } from "./LocalAPIRequest";
export interface ILocalAPIClient {
    invokeApiMethod(schemaSignature: string, daoName: string, methodName: string, args: any[]): Promise<void>;
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
    messageCallback: (message: any) => void;
    constructor();
    onMessage(callback: (message: any) => void): void;
    private hasValidSchemaSignature;
    invokeApiMethod(schemaSignature: string, objectName: string, methodName: string, args: any[]): Promise<any>;
    private wait;
    private isConnectionReady;
    private sendLocalRequest;
    private sendDemoRequest;
    private startDemoListener;
    private handleDemoResponse;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map