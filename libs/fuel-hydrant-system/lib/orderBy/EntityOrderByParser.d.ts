import { IQEntityInternal, JoinTreeNode } from "@airport/air-control";
import { JSONEntityFieldInOrderBy } from '@airport/ground-control';
import { AbstractEntityOrderByParser, IEntityOrderByParser } from "./AbstractEntityOrderByParser";
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Will hierarchically order the results of the query using breadth-first processing. Within a given entity will take
 * into account the sort order specified in the Order By clause.
 */
export declare class EntityOrderByParser extends AbstractEntityOrderByParser implements IEntityOrderByParser {
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
    getOrderByFragment(joinTree: JoinTreeNode, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }): string;
    buildOrderByFragmentForEntity(tableAlias: string, allColumnsToSortBy: string[], idColumnsToSortBy: string[], currentEntityOrderBy: JSONEntityFieldInOrderBy[], qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }): string;
    isForParentNode(joinTreeNode: JoinTreeNode, orderByField: JSONEntityFieldInOrderBy): boolean;
}
