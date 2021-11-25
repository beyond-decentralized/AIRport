export declare const NONHUB_CLIENT: import("@airport/di").IDiToken<INonhubClient>;
export interface INonhubClient {
    getRepository(repositoryUuid: string, transactionLogEntryTime?: number): Promise<any>;
    writeRepository(repositoryUuId: string, data: string): Promise<number>;
}
export declare class NonhubClient implements INonhubClient {
    masterKey: string;
    serverLocation: string;
    getRepository(repositoryUuId: string, transactionLogEntryTime?: number): Promise<any>;
    writeRepository(repositoryUuId: string, data: string): Promise<number>;
    private sendMessage;
}
//# sourceMappingURL=index.d.ts.map