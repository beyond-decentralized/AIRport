import { IEntityUtils } from "./definition/utils/IEntityUtils"
import { IQueryUtils } from "./definition/utils/IQueryUtils"
import { QEntityUtils } from "./implementation/utils/QEntityUtils"
import { lib } from "@airport/direction-indicator"

const tarmaqQuery = lib('tarmaq-query')
// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

tarmaqQuery.register(QEntityUtils)

export const ENTITY_UTILS = tarmaqQuery.token<IEntityUtils>('EntityUtils')
export const QUERY_UTILS = tarmaqQuery.token<IQueryUtils>('QueryUtils')
