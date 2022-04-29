import { IOC } from '@airport/direction-indicator';
import { QUERY_WEB_SERVICE } from '../tokens';
export function getQueryWsHandler(config) {
    return async (request, context) => {
        return await queryWsHandler(request, config, context);
    };
}
export async function queryWsHandler(request, config, context) {
    const queryWebService = await IOC.get(QUERY_WEB_SERVICE);
    return await queryWebService.handle(request, config, context);
}
//# sourceMappingURL=QueryWsAdaptor.js.map