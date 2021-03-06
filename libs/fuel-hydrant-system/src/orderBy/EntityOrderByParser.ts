import {
	DbEntity,
	JSONEntityFieldInOrderBy,
	JSONFieldInOrderBy,
	SortOrder
} from '@airport/ground-control'
import {
	IQEntityInternal,
	JoinTreeNode
} from '@airport/tarmaq-query'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import {
	AbstractEntityOrderByParser,
	IEntityOrderByParser
} from './AbstractEntityOrderByParser'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * Will hierarchically order the results of the query using breadth-first processing.
 * Within a given entity will take into account the sort order specified in the Order By
 * clause.
 */
export class EntityOrderByParser
	extends AbstractEntityOrderByParser
	implements IEntityOrderByParser {

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
		joinTree: JoinTreeNode,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): string {
		let orderByFragments: string[] = []
		let orderBy: JSONEntityFieldInOrderBy[] = []
		if (this.orderBy) {
			orderBy = this.orderBy.slice()
		}

		const selectFragmentQueue = []
		let currentSelectFragment = this.rootSelectClauseFragment
		selectFragmentQueue.push(currentSelectFragment)
		const joinNodeQueue = []
		let currentJoinNode = joinTree
		joinNodeQueue.push(currentJoinNode)

		// Perform breadth-first SELECT clause traversal
		while (
			(currentSelectFragment = selectFragmentQueue.shift())
			&& (currentJoinNode = joinNodeQueue.shift())) {

			const tableAlias = this.relationManager.getAlias(currentJoinNode.jsonRelation)
			const dbEntity: DbEntity = qEntityMapByAlias[tableAlias].__driver__.dbEntity

			const currentEntityOrderBy = []
			let parentNodeFound: boolean

			orderBy = orderBy.filter((orderByField) => {
				if (parentNodeFound) {
					return true
				}

				const orderByDbEntity: DbEntity = this.airportDatabase.applications[orderByField.si]
					.currentVersion[0].applicationVersion.entities[orderByField.ti]
				const dbColumn = orderByDbEntity.columns[orderByField.ci]
				if (this.isForParentNode(currentJoinNode, orderByField)) {
					throw new Error(`Found out of order entry in Order By 
					[${orderByDbEntity.applicationVersion.application.name} - ${orderByDbEntity.name}.${dbColumn.name}].
					Entries must be ordered hierarchically, in breadth-first order.`)
				}
				if (orderByField.si !== dbEntity.applicationVersion.application.index || orderByField.ti !== dbEntity.index) {
					return true
				}
				this.qValidator.validateReadProperty(dbColumn)
				orderByField.fa = `${tableAlias}.${dbColumn.name}`
				currentEntityOrderBy.push(orderByField)
				return false
			})

			// NOTE: Order by Ids is necessary to correctly reconstruct 
			// the entity graph

			const allColumnsToSortBy: string[] = []
			const idColumnsToSortBy: string[] = []
			// By now the SELECT clause is guaranteed to have:
			// Either all ID columns defined on the entity (if @Id columns are defined)
			// Or ALL of the columns on the entity (if no @Id columns are defined)
			for (const propertyName in currentSelectFragment) {
				const dbProperty = dbEntity.propertyMap[propertyName]
				if (dbProperty.relation && dbProperty.relation.length) {
					for (const dbPropertyColumn of dbProperty.propertyColumns) {
						const dbColumn = dbPropertyColumn.column
						allColumnsToSortBy.push(dbColumn.name)
						if (dbProperty.isId) {
							idColumnsToSortBy.push(dbColumn.name)
						}
					}

					if (!currentJoinNode.childNodes.length) {
						continue
					}

					const dbRelation = dbProperty.relation[0]
					const dbEntity = dbRelation.relationEntity

					const matchingNodes = currentJoinNode.childNodes.filter(childNode => {
						const jsonRelation = childNode.jsonRelation
						return jsonRelation.si === dbEntity.applicationVersion.application.index
							&& jsonRelation.ti === dbEntity.index
					})

					if (!matchingNodes.length) {
						return
					}

					selectFragmentQueue.push(this.rootSelectClauseFragment[propertyName])
					const childJoinNode = currentJoinNode.getEntityRelationChildNode(dbRelation)
					joinNodeQueue.push(childJoinNode)
				} else {
					const dbColumn = dbProperty.propertyColumns[0].column
					allColumnsToSortBy.push(dbColumn.name)
					// Tentatively add column to the list of columnIndexes to sort by
					if (dbProperty.isId) {
						idColumnsToSortBy.push(dbColumn.name)
					}
				}
			}
			let entityOrderByFragments = this.buildOrderByFragmentForEntity(
				tableAlias, allColumnsToSortBy,
				idColumnsToSortBy, currentEntityOrderBy, qEntityMapByAlias)
			orderByFragments = orderByFragments.concat(entityOrderByFragments)
		}
		if (orderBy.length) {
			throw new Error(`
			Found entries in ORDER_BY for tables not found in SELECT clause.  
			Entries must be ordered hierarchically, in breadth-first order.`)
		}

		return orderByFragments.join(', ')
	}

	buildOrderByFragmentForEntity(
		tableAlias: string,
		allColumnsToSortBy: string[],
		idColumnsToSortBy: string[],
		currentEntityOrderBy: JSONEntityFieldInOrderBy[],
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
	) {
		const finalOrderByColumnsFragments: JSONFieldInOrderBy[] = []
		const inputOrderByPropertyNameSet: { [propertyName: string]: boolean } = {}

		const dbEntity: DbEntity = qEntityMapByAlias[tableAlias].__driver__.dbEntity
		// First add the fields specified in the Order By clause for this entity
		currentEntityOrderBy.forEach((orderByField) => {
			finalOrderByColumnsFragments.push(orderByField)
			const columnName = dbEntity.columns[orderByField.ci].name
			inputOrderByPropertyNameSet[columnName] = true
		})
		if (idColumnsToSortBy.length) {
			// Then if the ID column is present in the result set, just order by id
			for (const idColumnName of idColumnsToSortBy) {
				if (!inputOrderByPropertyNameSet[idColumnName]) {
					finalOrderByColumnsFragments.push({
						fa: `${tableAlias}.${idColumnName}`,
						so: SortOrder.ASCENDING
					})
				}
			}
		} else {
			allColumnsToSortBy.forEach((columnName) => {
				if (!inputOrderByPropertyNameSet[columnName]) {
					finalOrderByColumnsFragments.push({
						fa: `${tableAlias}.${columnName}`,
						so: SortOrder.ASCENDING
					})
				}
			})
		}
		return this.getCommonOrderByFragment(finalOrderByColumnsFragments)
	}

	isForParentNode(
		joinTreeNode: JoinTreeNode,
		orderByField: JSONEntityFieldInOrderBy
	): boolean {
		do {
			joinTreeNode = joinTreeNode.parentNode
			if (!joinTreeNode) {
				return false
			}
			if (orderByField.si === joinTreeNode.jsonRelation.si
				&& orderByField.ti === joinTreeNode.jsonRelation.ti) {
				return true
			}
		} while (joinTreeNode.parentNode)

		return false
	}

}
