import { IQueryFacade } from "./definition/IDatabaseFacade"
import { ILookup } from "./definition/query/Lookup"
import { INonEntityFind } from "./definition/query/NonEntityFind"
import { INonEntityFindOne } from "./definition/query/NonEntityFindOne"
import { INonEntitySearch } from "./definition/query/NonEntitySearch"
import { INonEntitySearchOne } from "./definition/query/NonEntitySearchOne"
import { Lookup } from "./implementation/query/Lookup"
import { NonEntityFind } from "./implementation/query/NonEntityFind"
import { NonEntityFindOne } from "./implementation/query/NonEntityFindOne"
import { NonEntitySearch } from "./implementation/query/NonEntitySearch"
import { NonEntitySearchOne } from "./implementation/query/NonEntitySearchOne"
import { tarmaqDao } from "./library"

export const LOOKUP = tarmaqDao.token<ILookup>({
    class: Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
})
export const NON_ENTITY_FIND = tarmaqDao.token<INonEntityFind>({
    class: NonEntityFind,
    interface: 'INonEntityFind',
    token: 'NON_ENTITY_FIND'
})
export const NON_ENTITY_FIND_ONE = tarmaqDao.token<INonEntityFindOne>({
    class: NonEntityFindOne,
    interface: 'INonEntityFindOne',
    token: 'NON_ENTITY_FIND_ONE'
})
export const NON_ENTITY_SEARCH = tarmaqDao.token<INonEntitySearch>({
    class: NonEntitySearch,
    interface: 'INonEntitySearch',
    token: 'NON_ENTITY_SEARCH'
})
export const NON_ENTITY_SEARCH_ONE = tarmaqDao.token<INonEntitySearchOne>({
    class: NonEntitySearchOne,
    interface: 'INonEntitySearchOne',
    token: 'NON_ENTITY_SEARCH_ONE'
})
export const QUERY_FACADE = tarmaqDao.token<IQueryFacade>({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
})
