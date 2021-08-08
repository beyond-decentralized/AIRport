export interface ILocalAPIClient {
    invokeApiMethod(schemaName: string, daoName: string, methodName: string, args: any[]): Promise<void>;
}
export declare class LocalAPIClient implements ILocalAPIClient {
    invokeApiMethod(schemaName: string, daoName: string, methodName: string, args: any[]): Promise<any>;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map