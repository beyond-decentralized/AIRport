import { IClientQuery, IClientQueryManager } from "@airport/check-in";
/**
 * TODO: probably not-needed - queries no longer come from
 * the client directly.  They can come from the client but
 * are considered generic API calls. DaoRegistry is now
 * replaced with API registry.
 */
export declare class ClientQueryManager implements IClientQueryManager {
    getClientQuery(applicationName: string, daoName: string, methodName: string): Promise<IClientQuery>;
}
//# sourceMappingURL=ClientQueryManager.d.ts.map