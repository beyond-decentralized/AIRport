import { ILocalAPIRequest } from "./LocalAPIRequest";
export interface ILocalAPIClient {
    invokeApiMethod(schemaSignature: string, daoName: string, methodName: string, args: any[]): Promise<void>;
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
    constructor();
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