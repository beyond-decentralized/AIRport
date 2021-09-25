export interface ILocalAPIRequest {
    category: 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
    args: Array<boolean | number | string>;
    host: string;
    id: string;
    methodName: string;
    objectName: string;
    protocol: string;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map