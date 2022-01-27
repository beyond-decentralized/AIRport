export interface ILocalAPIResponse {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    category: 'ConnectionIsReady' | 'ToClient' | 'ToClientRedirected';
    domain: string;
    errorMessage: string;
    id: string;
    payload: any;
    protocol: string;
}
//# sourceMappingURL=LocalAPIResponse.d.ts.map