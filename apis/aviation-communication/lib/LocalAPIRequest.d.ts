export interface ICoreLocalApiRequest {
    args: Array<boolean | number | string>;
    methodName: string;
    objectName: string;
}
export interface ILocalAPIRequest extends ICoreLocalApiRequest {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
    domain: string;
    id: string;
    protocol: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map