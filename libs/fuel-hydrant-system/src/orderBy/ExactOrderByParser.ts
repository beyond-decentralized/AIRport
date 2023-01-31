import {
	QueryFieldInOrderBy,
	QuerySortOrder
}                                from '@airport/ground-control'
import {IValidator}              from '../validation/Validator'
import {INonEntityOrderByParser} from './AbstractEntityOrderByParser'

/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Will order the results exactly as specified in the Order By clause
 */
export class ExactOrderByParser
	implements INonEntityOrderByParser {

	constructor(private validator: IValidator) {
	}

	getOrderByFragment(
		rootSelectClauseFragment: any,
		orderBy: QueryFieldInOrderBy[]
	): string {
		return orderBy.map(
			(orderByField) => {
				this.validator.validateAliasedFieldAccess(orderByField.fa)
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
