export interface ILocalAPIRequest {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    args: Array<boolean | number | string>;
    category: 'AIRportAppHost' | 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
    domain: string;
    host: string;
    id: string;
    methodName: string;
    objectName: string;
    protocol: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map