import { QEntityUtils } from "./implementation/utils/QEntityUtils"
import { APPLICATION_UTILS } from "@airport/ground-control"
import { QENTITY_UTILS, QUERY_RELATION_MANAGER, QUERY_UTILS } from "./tarmaq.query.tokens"

QENTITY_UTILS.setClass(QEntityUtils)
QENTITY_UTILS.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    queryRelationManager: QUERY_RELATION_MANAGER,
    queryUtils: QUERY_UTILS
})
