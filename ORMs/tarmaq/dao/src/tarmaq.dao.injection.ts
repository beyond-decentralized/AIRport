import { lib } from "@airport/direction-indicator"
import {
    ENTITY_STATE_MANAGER,
    UPDATE_CACHE_MANAGER
} from "@airport/ground-control"
import { IDatabaseFacade, IQueryFacade } from "./definition/IDatabaseFacade"
import { Dao } from "./implementation/Dao"
import { Lookup } from "./implementation/query/Lookup"
import { NonEntityFind } from "./implementation/query/NonEntityFind"
import { NonEntityFindOne } from "./implementation/query/NonEntityFindOne"
import { NonEntitySearch } from "./implementation/query/NonEntitySearch"
import { NonEntitySearchOne } from "./implementation/query/NonEntitySearchOne"

const tarmaqDao = lib('tarmaq-dao')

tarmaqDao.register(
    Dao as any, Lookup, NonEntityFind,
    NonEntityFindOne, NonEntitySearch, NonEntitySearchOne,

)
export const DATABASE_FACADE = tarmaqDao.token<IDatabaseFacade>('DatabaseFacade')
export const QUERY_FACADE = tarmaqDao.token<IQueryFacade>('QueryFacade')

tarmaqDao.setDependencies(Dao as any, {
    databaseFacade: DATABASE_FACADE,
    entityStateManager: ENTITY_STATE_MANAGER,
    lookup: Lookup,
    updateCacheManager: UPDATE_CACHE_MANAGER
})
