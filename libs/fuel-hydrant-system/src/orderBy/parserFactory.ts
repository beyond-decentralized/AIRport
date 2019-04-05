import {IAirportDatabase} from '@airport/air-control'
import {
	JSONEntityFieldInOrderBy,
	QueryResultType
}                         from '@airport/ground-control'
import {
	EntityOrderByParser,
	IEntityOrderByParser,
	IValidator
}                         from '..'

export function getOrderByParser(
	airportDb: IAirportDatabase,
	queryResultType: QueryResultType,
	selectClauseFragment: any,
	validator: IValidator,
	orderBy?: JSONEntityFieldInOrderBy[]
): IEntityOrderByParser {
	switch (queryResultType) {
		case QueryResultType.ENTITY_GRAPH:
		case QueryResultType.ENTITY_TREE:
			return new EntityOrderByParser(airportDb, selectClauseFragment, validator, orderBy)
//		case QueryResultType.FLAT:
//		case QueryResultType.FIELD:
//			return new ExactOrderByParser(rootQEntity, selectClauseFragment,
// qEntityMapByName, entitiesRelationPropertyMap, entitiesPropertyTypeMap, orderBy);
		case QueryResultType.RAW:
			throw `Query parsing not supported for raw queries`
		default:
			throw `Unexpected queryResultType for an Entity ORDER BY parser: ${queryResultType}`
	}
}
