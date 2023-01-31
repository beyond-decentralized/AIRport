import {
	IAirportDatabase
} from '@airport/air-traffic-control'
import {
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
		protected relationManager: IQueryRelationManager,
		protected orderBy?: QueryEntityFieldInOrderBy[]
	) {
	}

	protected getCommonOrderByFragment(
		orderByFields: QueryFieldInOrderBy[],
	): string {
		return orderByFields.map((orderByField) => {
			switch (orderByField.so) {
				case QuerySortOrder.ASCENDING:
					return `${orderByField.fa} ASC`
				case QuerySortOrder.DESCENDING:
					return `${orderByField.fa} DESC`
			}
		})
			.join(', ')
	}

}
