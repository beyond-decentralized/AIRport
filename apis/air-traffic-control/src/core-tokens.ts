import { Utils } from "./impl/Utils"
import { QueryUtils } from "./impl/utils/QueryUtils"
import { airTrafficControl } from "./library"
import { IUtils } from "./lingo/Utils"
import { IEntityUtils } from "./lingo/utils/EntityUtils"
import { IQueryUtils } from "./lingo/utils/QueryUtils"

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

export const UTILS = airTrafficControl.token<IUtils>({
    class: Utils,
    interface: 'IUtils',
    token: 'UTILS'
})
export const ENTITY_UTILS = airTrafficControl.token<IEntityUtils>({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
})
export const QUERY_UTILS = airTrafficControl.token<IQueryUtils>({
    class: QueryUtils,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
})

ENTITY_UTILS.setDependencies({
    utils: UTILS
})
