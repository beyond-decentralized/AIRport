export interface ILocalAPIResponse {
    category: 'ConnectionIsReady' | 'ToApp' | 'ToAppRedirected';
    errorMessage: string;
    id: string;
    host: string;
    payload: any;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIResponse.d.ts.map