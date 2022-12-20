import { Utils } from "./implementation/Utils"
import { QueryUtils } from "./implementation/utils/QueryUtils"
import { ENTITY_UTILS, QUERY_UTILS } from "@airport/tarmaq-query"
import { airTrafficControl } from "./injectionLibrary"

// Separating core-tokens from tokens removes circular dependencies
// at code initialization time

airTrafficControl.register(Utils)

ENTITY_UTILS.setDependencies({
    utils: Utils
})

QUERY_UTILS.setClass(QueryUtils)
