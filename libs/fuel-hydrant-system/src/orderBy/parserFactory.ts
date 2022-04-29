import { IAirportDatabase, IRelationManager } from '@airport/air-control'
import {
	JSONEntityFieldInOrderBy,
	QueryResultType
} from '@airport/ground-control'
import { IValidator } from '../validation/Validator'
import { IEntityOrderByParser } from './AbstractEntityOrderByParser'
import { EntityOrderByParser } from './EntityOrderByParser'

export function getOrderByParser(
	queryResultType: QueryResultType,
	selectClauseFragment: any,
	airportDatabase: IAirportDatabase,
	qValidator: IValidator,
	relationalManager: IRelationManager,
	orderBy?: JSONEntityFieldInOrderBy[]
): IEntityOrderByParser {
	switch (queryResultType) {
		case QueryResultType.ENTITY_GRAPH:
		case QueryResultType.ENTITY_TREE:
			return new EntityOrderByParser(selectClauseFragment, airportDatabase,
				qValidator, relationalManager, orderBy)
		//		case QueryResultType.FLAT:
		//		case QueryResultType.FIELD:
		//			return new ExactOrderByParser(rootQEntity, selectClauseFragment,
		// qEntityMapByName, entitiesRelationPropertyMap, entitiesPropertyTypeMap, orderBy);
		case QueryResultType.RAW:
			throw new Error(`Query parsing not supported for raw queries`)
		default:
			throw new Error(
				`Unexpected queryResultType for an Entity ORDER BY parser: ${queryResultType}`)
	}
}
