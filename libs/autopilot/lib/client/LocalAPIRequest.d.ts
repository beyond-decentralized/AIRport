export interface ILocalAPIRequest {
    __received__?: boolean;
    args: Array<boolean | number | string>;
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
    host: string;
    id: string;
    methodName: string;
    objectName: string;
    protocol: string;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map