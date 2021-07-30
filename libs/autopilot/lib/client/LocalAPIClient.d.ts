export interface ILocalAPIClient {
    invokeDaoMethod(schemaName: string, daoName: string, methodName: string, args: any[]): Promise<void>;
}
export declare class LocalAPIClient implements ILocalAPIClient {
    invokeDaoMethod(schemaName: string, daoName: string, methodName: string, args: any[]): Promise<any>;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map