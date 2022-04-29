import { QueryResultType } from '@airport/ground-control';
import { EntityOrderByParser } from './EntityOrderByParser';
export function getOrderByParser(queryResultType, selectClauseFragment, airportDatabase, qValidator, relationalManager, orderBy) {
    switch (queryResultType) {
        case QueryResultType.ENTITY_GRAPH:
        case QueryResultType.ENTITY_TREE:
            return new EntityOrderByParser(selectClauseFragment, airportDatabase, qValidator, relationalManager, orderBy);
        //		case QueryResultType.FLAT:
        //		case QueryResultType.FIELD:
        //			return new ExactOrderByParser(rootQEntity, selectClauseFragment,
        // qEntityMapByName, entitiesRelationPropertyMap, entitiesPropertyTypeMap, orderBy);
        case QueryResultType.RAW:
            throw new Error(`Query parsing not supported for raw queries`);
        default:
            throw new Error(`Unexpected queryResultType for an Entity ORDER BY parser: ${queryResultType}`);
    }
}
//# sourceMappingURL=parserFactory.js.map