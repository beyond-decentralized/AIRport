import {
	IQEntityInternal,
	JoinTreeNode
}                          from '@airport/air-control'
import {
	JSONEntityFieldInOrderBy,
	JSONFieldInOrderBy,
	SortOrder
}                          from '@airport/ground-control'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import {IValidator}        from '../validation/Validator'

/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {

	getOrderByFragment(
		joinTree: JoinTreeNode,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal<any> },
		context: IFuelHydrantContext,
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
					return `${orderByField.fa} ASC`
				case SortOrder.DESCENDING:
					return `${orderByField.fa} DESC`
			}
		})
			.join(', ')
	}

}
