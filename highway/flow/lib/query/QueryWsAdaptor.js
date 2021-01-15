import { DI } from '@airport/di';
import { QUERY_WEB_SERVICE } from '../tokens';
export function getQueryWsHandler(config) {
    return async (request, context) => {
        return await queryWsHandler(request, config, context);
    };
}
export async function queryWsHandler(request, config, context) {
    const queryWebService = await DI.db().get(QUERY_WEB_SERVICE);
    return await queryWebService.handle(request, config, context);
}
//# sourceMappingURL=QueryWsAdaptor.js.map