import { ENTITY_STATE_MANAGER, UPDATE_CACHE_MANAGER } from "@airport/ground-control";
import { Dao } from "./implementation/Dao";
import { Lookup } from "./implementation/query/Lookup";
import { NonEntityFind } from "./implementation/query/NonEntityFind";
import { NonEntityFindOne } from "./implementation/query/NonEntityFindOne";
import { NonEntitySearch } from "./implementation/query/NonEntitySearch";
import { NonEntitySearchOne } from "./implementation/query/NonEntitySearchOne";
import { tarmaqDao } from "./library";
export const DAO = tarmaqDao.token({
    class: Dao,
    interface: 'class Dao',
    token: 'DAO'
});
export const DATABASE_FACADE = tarmaqDao.token({
    class: null,
    interface: 'IDatabaseFacade',
    token: 'DATABASE_FACADE'
});
export const LOOKUP = tarmaqDao.token({
    class: Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
});
export const NON_ENTITY_FIND = tarmaqDao.token({
    class: NonEntityFind,
    interface: 'INonEntityFind',
    token: 'NON_ENTITY_FIND'
});
export const NON_ENTITY_FIND_ONE = tarmaqDao.token({
    class: NonEntityFindOne,
    interface: 'INonEntityFindOne',
    token: 'NON_ENTITY_FIND_ONE'
});
export const NON_ENTITY_SEARCH = tarmaqDao.token({
    class: NonEntitySearch,
    interface: 'INonEntitySearch',
    token: 'NON_ENTITY_SEARCH'
});
export const NON_ENTITY_SEARCH_ONE = tarmaqDao.token({
    class: NonEntitySearchOne,
    interface: 'INonEntitySearchOne',
    token: 'NON_ENTITY_SEARCH_ONE'
});
export const QUERY_FACADE = tarmaqDao.token({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
});
DAO.setDependencies({
    databaseFacade: DATABASE_FACADE,
    entityStateManager: ENTITY_STATE_MANAGER,
    lookup: LOOKUP,
    updateCacheManager: UPDATE_CACHE_MANAGER
});
//# sourceMappingURL=tokens.js.map