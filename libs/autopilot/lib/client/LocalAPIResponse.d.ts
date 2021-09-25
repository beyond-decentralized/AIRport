export interface ILocalAPIResponse {
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected';
    errorMessage: string;
    id: string;
    host: string;
    payload: any;
    protocol: string;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIResponse.d.ts.map