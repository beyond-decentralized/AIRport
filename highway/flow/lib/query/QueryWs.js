import { DI } from '@airport/di';
import { QUERY_VALIDATOR, QUERY_WEB_SERVICE } from '../tokens';
export class QueryWebService {
    async handle(request, config = {}, context) {
        const queryValidator = await DI.db().get(QUERY_VALIDATOR);
        try {
            queryValidator.validate(request);
        }
        catch (e) {
            return {
                error: e.message
            };
        }
    }
}
DI.set(QUERY_WEB_SERVICE, QueryWebService);
//# sourceMappingURL=QueryWs.js.map