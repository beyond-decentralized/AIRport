export interface ILocalAPIResponse {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected';
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