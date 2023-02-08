import { IEntityUtils } from "./definition/utils/IEntityUtils"
import { IQueryUtils } from "./definition/utils/IQueryUtils"
import { QEntityUtils } from "./implementation/utils/QEntityUtils"
import { lib } from "@airport/direction-indicator"
import { APPLICATION_UTILS } from "@airport/ground-control"
import { IQueryRelationManager } from "./tarmaq.query.index"

const tarmaqQuery = lib('tarmaq-query')
// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

tarmaqQuery.register(QEntityUtils)

export const ENTITY_UTILS = tarmaqQuery.token<IEntityUtils>('EntityUtils')
export const QUERY_RELATION_MANAGER= tarmaqQuery.token<IQueryRelationManager>('QueryRelationManager')
export const QUERY_UTILS = tarmaqQuery.token<IQueryUtils>('QueryUtils')

tarmaqQuery.setDependencies(QEntityUtils, {
    applicationUtils: APPLICATION_UTILS,
    queryRelationManager: QUERY_RELATION_MANAGER,
    queryUtils: QUERY_UTILS
})

globalThis.ENTITY_UTILS = ENTITY_UTILS
globalThis.QUERY_UTILS = QUERY_UTILS