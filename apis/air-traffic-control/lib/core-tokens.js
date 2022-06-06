import { Utils } from "./impl/Utils";
import { QueryUtils } from "./impl/utils/QueryUtils";
import { airTrafficControl } from "./library";
// Separating core-tokens from tokens removes circular dependencies
// at code initialization time
export const UTILS = airTrafficControl.token({
    class: Utils,
    interface: 'IUtils',
    token: 'UTILS'
});
export const ENTITY_UTILS = airTrafficControl.token({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
});
export const QUERY_UTILS = airTrafficControl.token({
    class: QueryUtils,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
});
ENTITY_UTILS.setDependencies({
    utils: UTILS
});
//# sourceMappingURL=core-tokens.js.map