
import { lib } from "@airport/direction-indicator"
import { IEntityUtils } from "./definition/utils/IEntityUtils"
import { IQEntityUtils } from "./definition/utils/IQEntityUtils"
import { IQueryUtils } from "./definition/utils/IQueryUtils"
import { IQueryRelationManager } from "./definition/core/entity/IQueryRelationManager"

export const tarmaqQuery = lib('tarmaq-query')

export const ENTITY_UTILS = tarmaqQuery.token<IEntityUtils>('EntityUtils')
export const QENTITY_UTILS = tarmaqQuery.token<IQEntityUtils>('QEntityUtils')
export const QUERY_RELATION_MANAGER= tarmaqQuery.token<IQueryRelationManager>('QueryRelationManager')
export const QUERY_UTILS = tarmaqQuery.token<IQueryUtils>('QueryUtils')

globalThis.ENTITY_UTILS = ENTITY_UTILS
globalThis.QENTITY_UTILS = QENTITY_UTILS
globalThis.QUERY_UTILS = QUERY_UTILS
