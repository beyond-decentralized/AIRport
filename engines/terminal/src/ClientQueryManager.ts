import {
    CLIENT_QUERY_MANAGER,
    IClientQuery,
    IClientQueryManager
} from "@airport/check-in";
import { container, DI } from "@airport/di";
import { DAO_REGISTRY } from "./tokens";

/**
 * TODO: probably not-needed - queries no longer come from
 * the client directly.  They can come from the client but
 * are considered generic API calls. DaoRegistry is now
 * replaced with API registry. 
 */
export class ClientQueryManager
    implements IClientQueryManager {

    async getClientQuery(
        schemaName: string,
        daoName: string,
        methodName: string
    ): Promise<IClientQuery> {
        const daoRegistry = await container(this).get(DAO_REGISTRY)

        throw new Error('TODO: implement')
    }

}
DI.set(CLIENT_QUERY_MANAGER, ClientQueryManager)
