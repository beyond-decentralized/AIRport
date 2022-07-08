import { Utils } from "./implementation/Utils"
import { QueryUtils } from "./implementation/utils/QueryUtils"
import { airTrafficControl } from "./library"
import { IUtils } from "./definition/Utils"
import { IEntityUtils } from "./definition/utils/EntityUtils"
import { IQueryUtils } from "./definition/utils/QueryUtils"

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

export const UTILS = airTrafficControl.token<IUtils>({
    class: Utils,
    interface: 'IUtils',
    token: 'UTILS'
})

ENTITY_UTILS.setDependencies({
    utils: UTILS
})
QUERY_UTILS.setClass(QueryUtils)
