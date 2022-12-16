import { IEntityQueryDatabaseFacade } from "./definition/core/IEntityQueryDatabaseFacade"
import { IQEntityUtils } from "./definition/utils/IQEntityUtils"
import { IEntityUtils } from "./definition/utils/IEntityUtils"
import { IQueryUtils } from "./definition/utils/IQueryUtils"
import { QEntityUtils } from "./implementation/utils/QEntityUtils"
import { tarmaqQuery } from "./library"

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

export const ENTITY_UTILS = tarmaqQuery.token<IEntityUtils>({
    class: null,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
})
export const Q_ENTITY_UTILS = tarmaqQuery.token<IQEntityUtils>({
    class: QEntityUtils,
    interface: 'IQEntityUtils',
    token: 'Q_ENTITY_UTILS'
})
export const QUERY_UTILS = tarmaqQuery.token<IQueryUtils>({
    class: null,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
})
