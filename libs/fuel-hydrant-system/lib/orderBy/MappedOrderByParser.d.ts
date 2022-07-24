import { JSONFieldInOrderBy } from '@airport/ground-control';
import { IValidator } from '../validation/Validator';
import { INonEntityOrderByParser } from './AbstractEntityOrderByParser';
/**
 * Created by Papa on 11/8/2016.
 */
/**
 * Will hierarchically order the results of the query using breadth-first processing.
 * Within a given sub-SELECT facade will take into account the sort order specified in the Order
 * By clause.
 */
export declare class MappedOrderByParser implements INonEntityOrderByParser {
    private validator;
    constructor(validator: IValidator);
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
    getOrderByFragment(rootSelectClauseFragment: any, originalOrderBy: JSONFieldInOrderBy[]): string;
    buildOrderByFragmentForEntity(orderByFields: JSONFieldInOrderBy[]): string[];
}
//# sourceMappingURL=MappedOrderByParser.d.ts.map