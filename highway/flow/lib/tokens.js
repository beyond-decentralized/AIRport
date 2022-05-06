import { lib } from '@airport/direction-indicator';
import { QueryValidator } from './query/QueryValidator';
import { QueryWebService } from './query/QueryWs';
const hwFlow = lib('hw-flow');
export const QUERY_WEB_SERVICE = hwFlow.token({
    class: QueryWebService,
    interface: 'IQueryWebService',
    token: 'IQueryWebService'
});
export const QUERY_VALIDATOR = hwFlow.token({
    class: QueryValidator,
    interface: 'IQueryValidator',
    token: 'IQueryValidator'
});
QUERY_WEB_SERVICE.setDependencies({
    queryValidator: QUERY_VALIDATOR
});
//# sourceMappingURL=tokens.js.map