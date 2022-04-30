import { Injected } from "@airport/air-control";
import {
    IClientQuery,
    IClientQueryManager
} from "@airport/check-in";

/**
 * TODO: probably not-needed - queries no longer come from
 * the client directly.  They can come from the client but
 * are considered generic API calls. DaoRegistry is now
 * replaced with API registry. 
 */
@Injected()
export class ClientQueryManager
    implements IClientQueryManager {

    async getClientQuery(
        applicationName: string,
        daoName: string,
        methodName: string
    ): Promise<IClientQuery> {
        // const daoRegistry = await container(this).get(DAO_REGISTRY)

        throw new Error('TODO: implement')
    }

}
