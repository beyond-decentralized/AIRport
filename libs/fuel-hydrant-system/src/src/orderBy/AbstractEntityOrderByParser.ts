import { IAirportDatabase, IQEntityInternal, JoinTreeNode }                         from "../../../../apis/air-control/lib/index";
import { JSONEntityFieldInOrderBy, JSONFieldInOrderBy, QueryResultType, SortOrder } from "../../../../apis/ground-control/lib/index";
import { IValidator }                                                               from "../../../../apps/terminal/src/validation/Validator";
import { EntityOrderByParser }                                                      from "./EntityOrderByParser";

/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {

	getOrderByFragment(
		joinTree: JoinTreeNode,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal }
	): string;

}

export interface INonEntityOrderByParser {

	getOrderByFragment(
		rootSelectClauseFragment: any,
		originalOrderBy: JSONFieldInOrderBy[]
	): string;

}

export abstract class AbstractEntityOrderByParser {

	constructor(
		protected airportDb: IAirportDatabase,
		protected rootSelectClauseFragment: any,
		protected validator: IValidator,
		protected orderBy?: JSONEntityFieldInOrderBy[]
	) {
	}

	protected getCommonOrderByFragment(
		orderByFields: JSONFieldInOrderBy[],
	): string {
		return orderByFields.map((orderByField) => {
			switch (orderByField.so) {
				case SortOrder.ASCENDING:
					return `${orderByField.fa} ASC`;
				case SortOrder.DESCENDING:
					return `${orderByField.fa} DESC`;
			}
		}).join(', ');
	}

}

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
			return new EntityOrderByParser(airportDb, selectClauseFragment, validator, orderBy);
//		case QueryResultType.FLAT:
//		case QueryResultType.FIELD:
//			return new ExactOrderByParser(rootQEntity, selectClauseFragment, qEntityMapByName, entitiesRelationPropertyMap, entitiesPropertyTypeMap, orderBy);
		case QueryResultType.RAW:
			throw `Query parsing not supported for raw queries`;
		default:
			throw `Unexpected queryResultType for an Entity ORDER BY parser: ${queryResultType}`;
	}
}
