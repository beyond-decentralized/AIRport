import { IEntityQueryDatabaseFacade } from "./definition/core/IEntityQueryDatabaseFacade"
import { IEntityUtils } from "./definition/utils/IEntityUtils"
import { IQueryUtils } from "./definition/utils/IQueryUtils"
import { tarmaqQuery } from "./library"

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

export const ENTITY_UTILS = tarmaqQuery.token<IEntityUtils>({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
})
export const QUERY_UTILS = tarmaqQuery.token<IQueryUtils>({
    class: null,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
})
export const QUERY_FACADE = tarmaqQuery.token<IEntityQueryDatabaseFacade<any, any, any, any, any, any, any, any>>({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
})