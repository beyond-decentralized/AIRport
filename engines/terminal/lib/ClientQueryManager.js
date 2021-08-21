import { CLIENT_QUERY_MANAGER } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { DAO_REGISTRY } from "./tokens";
export class ClientQueryManager {
    async getClientQuery(schemaName, daoName, methodName) {
        const daoRegistry = await container(this).get(DAO_REGISTRY);
        throw new Error('TODO: implement');
    }
}
DI.set(CLIENT_QUERY_MANAGER, ClientQueryManager);
//# sourceMappingURL=ClientQueryManager.js.map