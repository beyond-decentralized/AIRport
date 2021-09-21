export interface ILocalAPIRequest {
    category: 'FromApp' | 'FromAppRedirected';
    args: Array<boolean | number | string>;
    host: string;
    id: string;
    methodName: string;
    objectName: string;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map