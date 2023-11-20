import {
	IAirportDatabase
} from '@airport/air-traffic-control'
import {
	IEntityStateManager,
	QueryEntityFieldInOrderBy,
	QueryFieldInOrderBy,
	QuerySortOrder
} from '@airport/ground-control'
import {
	IQEntityInternal,
	IQueryRelationManager,
	JoinTreeNode
} from '@airport/tarmaq-query';
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { IValidator } from '../validation/Validator'

/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {

	getOrderByFragment(
		joinTree: JoinTreeNode,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): string;

}

export interface INonEntityOrderByParser {

	getOrderByFragment(
		rootSelectClauseFragment: any,
		originalOrderBy: QueryFieldInOrderBy[]
	): string;

}

export abstract class AbstractEntityOrderByParser {

	constructor(
		protected rootSelectClauseFragment: any,
		protected airportDatabase: IAirportDatabase,
		protected qValidator: IValidator,
		protected queryRelationManager: IQueryRelationManager,
		protected entityStateManager: IEntityStateManager,
		protected orderBy?: QueryEntityFieldInOrderBy[]
	) {
	}

	protected getCommonOrderByFragment(
		orderByFields: QueryFieldInOrderBy[],
	): string {
		return orderByFields.map((orderByField) => {
			switch (orderByField.sortOrder) {
				case QuerySortOrder.ASCENDING:
					return `${orderByField.fieldAlias} ASC`
				case QuerySortOrder.DESCENDING:
					return `${orderByField.fieldAlias} DESC`
			}
		})
			.join(', ')
	}

}
