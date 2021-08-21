import { IClientQuery, IClientQueryManager } from "@airport/check-in";
export declare class ClientQueryManager implements IClientQueryManager {
    getClientQuery(schemaName: string, daoName: string, methodName: string): Promise<IClientQuery>;
}
//# sourceMappingURL=ClientQueryManager.d.ts.map