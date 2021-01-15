import { DI } from '@airport/di';
import { QUERY_VALIDATOR } from '../tokens';
import { QueryType } from './Query';
export class QueryValidator {
    validate(request) {
        switch (request.type) {
            case QueryType.DYNAMIC:
                throw new Error(`Dynamic queries are not (yet) supported by Highway.`);
            case QueryType.PREPARED:
                // TODO: implement
                return null;
            default:
                throw new Error(`Unknown Query type: ${request.type}`);
        }
    }
}
DI.set(QUERY_VALIDATOR, QueryValidator);
//# sourceMappingURL=QueryValidator.js.map