export interface ILocalAPIClient {
    invokeDaoMethod(daoName: string, methodName: string, args: any[]): Promise<void>;
}
export declare class LocalAPIClient implements ILocalAPIClient {
    invokeDaoMethod(daoName: string, methodName: string, args: any[]): Promise<any>;
}
//# sourceMappingURL=LocalAPIClient.d.ts.map