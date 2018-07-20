import { JSONClauseField, JSONFieldInOrderBy, SortOrder } from "@airport/ground-control";
import { IValidator } from "../../validation/Validator";
import { INonEntityOrderByParser } from "./AbstractEntityOrderByParser";

/**
 * Created by Papa on 11/8/2016.
 */

/**
 * Will hierarchically order the results of the query using breadth-first processing.
 * Within a given sub-select facade will take into account the sort order specified in the Order By clause.
 */
export class MappedOrderByParser implements INonEntityOrderByParser {

	constructor(private validator: IValidator) {
	}

	/**
	 * Using the following algorithm
	 * http://stackoverflow.com/questions/2549541/performing-breadth-first-search-recursively
	 * :
	 BinarySearchTree.prototype.breadthFirst = function() {
	  var result = '',
	  queue = [],
	  current = this.root;

	  if (!current) return null;
	  queue.push(current);

	  while (current = queue.shift()) {
			result += current.value + ' ';
			current.left && queue.push(current.left);
			current.right && queue.push(current.right);
		}
	  return result;
	 }
	 *
	 * @param joinTree
	 * @param qEntityMapByAlias
	 * @returns {string}
	 */
	getOrderByFragment(
		rootSelectClauseFragment: any,
		originalOrderBy: JSONFieldInOrderBy[]
	): string {
		let orderByFragments: string[] = [];
		let orderBy: JSONFieldInOrderBy[] = [];
		if (originalOrderBy) {
			orderBy = originalOrderBy.slice();
		}

		let selectFragmentQueue = [];
		let currentSelectFragment = rootSelectClauseFragment;
		selectFragmentQueue.push(currentSelectFragment);

		// Breadth first traversal using a queue
		while (currentSelectFragment = selectFragmentQueue.shift()) {

			let currentSelectFragmentFieldSet: { [alias: string]: boolean } = {};

			for (let propertyName in currentSelectFragment) {
				let field: JSONClauseField = currentSelectFragment[propertyName];
				if (!field.af) {
					selectFragmentQueue.push(field);
					continue;
				}
				currentSelectFragmentFieldSet[field.fa] = true;
			}


			let currentEntityOrderBy: JSONFieldInOrderBy[] = [];

			// First add the fields specified in the query Order By clause for this entity, in the order they are specified
			orderBy = orderBy.filter((orderByField) => {
				if (!currentSelectFragmentFieldSet[orderByField.fa]) {
					return true;
				}
				delete currentSelectFragmentFieldSet[orderByField.fa];
				currentEntityOrderBy.push(orderByField);
				return false;
			});
			// Then add all the rest of the fields for this entity, we are maintaining the tree structure of the result
			for (let alias in currentSelectFragmentFieldSet) {
				currentEntityOrderBy.push({
					fa: alias,
					so: SortOrder.ASCENDING
				});
			}

			let entityOrderByFragments = this.buildOrderByFragmentForEntity(currentEntityOrderBy);
			orderByFragments = orderByFragments.concat(entityOrderByFragments);
		}
		if (orderBy.length) {
			throw `Found entries in Order By for tables not found in select clause.  Entries must be ordered hierarchically, in breadth-first order.`;
		}

		return orderByFragments.join(', ');
	}

	buildOrderByFragmentForEntity(
		orderByFields: JSONFieldInOrderBy[]
	): string[] {
		return orderByFields.map((orderByField) => {
			this.validator.validateAliasedFieldAccess(orderByField.fa);
			switch (orderByField.so) {
				case SortOrder.ASCENDING:
					return `${orderByField.fa} ASC`;
				case SortOrder.DESCENDING:
					return `${orderByField.fa} DESC`;
			}
		});
	}

}