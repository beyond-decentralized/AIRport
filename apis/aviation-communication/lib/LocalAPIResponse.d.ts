export interface ILocalAPIResponse {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    args: any[];
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected' | 'FromDb';
    domain: string;
    errorMessage: string;
    hostDomain: string;
    hostProtocol: string;
    id: string;
    methodName: string;
    objectName: string;
    payload: any;
    protocol: string;
    transactionId: string;
}
//# sourceMappingURL=LocalAPIResponse.d.ts.map