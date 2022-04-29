import { CLIENT_QUERY_MANAGER } from "@airport/check-in";
import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
/**
 * TODO: probably not-needed - queries no longer come from
 * the client directly.  They can come from the client but
 * are considered generic API calls. DaoRegistry is now
 * replaced with API registry.
 */
export class ClientQueryManager {
    async getClientQuery(applicationName, daoName, methodName) {
        // const daoRegistry = await container(this).get(DAO_REGISTRY)
        throw new Error('TODO: implement');
    }
}
DEPENDENCY_INJECTION.set(CLIENT_QUERY_MANAGER, ClientQueryManager);
//# sourceMappingURL=ClientQueryManager.js.map