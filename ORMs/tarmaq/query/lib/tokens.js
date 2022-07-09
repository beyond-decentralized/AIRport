import { tarmaqQuery } from "./library";
// Separating core-tokens from tokens removes circular dependencies
// at code initialization time
export const ENTITY_UTILS = tarmaqQuery.token({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
});
export const QUERY_UTILS = tarmaqQuery.token({
    class: null,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
});
export const QUERY_FACADE = tarmaqQuery.token({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
});
//# sourceMappingURL=tokens.js.map