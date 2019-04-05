"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const __1 = require("..");
function getOrderByParser(airportDb, queryResultType, selectClauseFragment, validator, orderBy) {
    switch (queryResultType) {
        case ground_control_1.QueryResultType.ENTITY_GRAPH:
        case ground_control_1.QueryResultType.ENTITY_TREE:
            return new __1.EntityOrderByParser(airportDb, selectClauseFragment, validator, orderBy);
        //		case QueryResultType.FLAT:
        //		case QueryResultType.FIELD:
        //			return new ExactOrderByParser(rootQEntity, selectClauseFragment,
        // qEntityMapByName, entitiesRelationPropertyMap, entitiesPropertyTypeMap, orderBy);
        case ground_control_1.QueryResultType.RAW:
            throw `Query parsing not supported for raw queries`;
        default:
            throw `Unexpected queryResultType for an Entity ORDER BY parser: ${queryResultType}`;
    }
}
exports.getOrderByParser = getOrderByParser;
//# sourceMappingURL=parserFactory.js.map