import {
	JSONEntityFieldInOrderBy,
	QueryResultType
}                             from '@airport/ground-control'
import {IValidator}           from '../validation/Validator'
import {IEntityOrderByParser} from './AbstractEntityOrderByParser'
import {EntityOrderByParser}  from './EntityOrderByParser'

export function getOrderByParser(
	queryResultType: QueryResultType,
	selectClauseFragment: any,
	validator: IValidator,
	orderBy?: JSONEntityFieldInOrderBy[]
): IEntityOrderByParser {
	switch (queryResultType) {
		case QueryResultType.ENTITY_GRAPH:
		case QueryResultType.ENTITY_TREE:
			return new EntityOrderByParser(selectClauseFragment, validator, orderBy)
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
