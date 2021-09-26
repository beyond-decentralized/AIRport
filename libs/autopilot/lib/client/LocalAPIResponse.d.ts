export interface ILocalAPIResponse {
    __received__?: boolean;
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected';
    errorMessage: string;
    id: string;
    host: string;
    payload: any;
    protocol: string;
    schemaSignature: string;
}
//# sourceMappingURL=LocalAPIResponse.d.ts.map