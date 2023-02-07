import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	IQEntityInternal,
	IQTree,
	IQueryUtils,
	IQueryRelationManager,
	JoinTreeNode,
	QBooleanField,
	QDateField,
	QNumberField,
	QStringField,
	QTree,
} from '@airport/tarmaq-query'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	IApplicationUtils,
	IEntityStateManager,
	InternalFragments,
	JoinType,
	QueryFieldClause,
	QueryClauseObjectType,
	QueryEntityRelation,
	QueryFieldInGroupBy,
	QueryFieldInOrderBy,
	QueryField,
	QueryJoinRelation,
	QueryNonEntity,
	QueryRelation,
	QueryRelationType,
	QueryViewJoinRelation,
	QueryResultType,
	QuerySortOrder,
	SQLDataType,
	Dictionary
} from '@airport/ground-control'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { INonEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser'
import { IValidator } from '../validation/Validator'
import {
	SQLDialect,
	SQLQuery
} from './core/SQLQuery'
import { ClauseType } from './core/SQLWhereBase'
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator'
import { SqlFunctionField } from './SqlFunctionField'

/**
 * Created by Papa on 10/28/2016.
 */

export abstract class NonEntitySQLQuery<JNEQ extends QueryNonEntity>
	extends SQLQuery<JNEQ> {

	protected joinTrees: JoinTreeNode[]
	protected orderByParser: INonEntityOrderByParser

	constructor(
		nonEntityQuery: JNEQ,
		dialect: SQLDialect,
		queryResultType: QueryResultType,
		dictionary: Dictionary,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		queryRelationManager: IQueryRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementQueryGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
	) {
		super(nonEntityQuery,
			null,
			dialect, queryResultType,
			dictionary,
			airportDatabase,
			applicationUtils,
			queryUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			queryRelationManager,
			sqlQueryAdapter,
			storeDriver,
			subStatementQueryGenerator,
			utils, context)
	}

	addQEntityMapByAlias(
		sourceMap: { [entityAlias: string]: IQEntityInternal }
	) {
		for (let alias in sourceMap) {
			this.qEntityMapByAlias[alias] = sourceMap[alias]
		}
	}

	toSQL(
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		let nonEntityQuery = <QueryNonEntity>this.query
		let joinNodeMap: { [alias: string]: JoinTreeNode }
			= {}
		this.joinTrees = this.buildFromJoinTree(
			nonEntityQuery.FROM, joinNodeMap, context)
		let selectFragment = this.getSELECTFragment(
			false, nonEntityQuery.SELECT, internalFragments,
			context)
		let fromFragment = this.getFROMFragments(
			this.joinTrees, context)
		let whereFragment = ''
		if (nonEntityQuery.WHERE) {
			whereFragment = `
WHERE
	${this.getWHEREFragment(nonEntityQuery.WHERE, '', context)}`
		}
		let groupByFragment = ''
		if (nonEntityQuery.GROUP_BY && nonEntityQuery.GROUP_BY.length) {
			groupByFragment = `
GROUP BY
	${this.getGroupByFragment(nonEntityQuery.GROUP_BY)}`
		}
		let havingFragment = ''
		if (nonEntityQuery.HAVING) {
			havingFragment = `
HAVING
	${this.getWHEREFragment(nonEntityQuery.HAVING, '', context)}`
		}
		let orderByFragment = ''
		if (nonEntityQuery.ORDER_BY && nonEntityQuery.ORDER_BY.length) {
			orderByFragment = `
ORDER BY
	${this.orderByParser.getOrderByFragment(nonEntityQuery.SELECT, nonEntityQuery.ORDER_BY)}`
		}
		let offsetFragment = ''
		if (nonEntityQuery.OFFSET) {
			offsetFragment = this.sqlQueryAdapter.getOffsetFragment(nonEntityQuery.OFFSET)
		}
		let limitFragment = ''
		if (nonEntityQuery.LIMIT) {
			offsetFragment = this.sqlQueryAdapter.getLimitFragment(nonEntityQuery.LIMIT)
		}

		return `SELECT
	${selectFragment}
FROM
${fromFragment}${whereFragment}${groupByFragment}${havingFragment}${orderByFragment}${offsetFragment}${limitFragment}
${this.storeDriver.getSelectQuerySuffix(this.query, context)}`
	}

	buildFromJoinTree(
		queryRelations: QueryRelation[],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		context: IFuelHydrantContext,
	): JoinTreeNode[] {
		let joinTreeNodes: JoinTreeNode[] = []
		let joinTreeNode: JoinTreeNode

		// For entity queries it is possible to have a query with no from clause, in this case
		// make the query entity the root tree node
		if (queryRelations.length < 1) {
			throw new Error(
				`FROM clause must have entries for non-Entity queries`)
		}

		let firstRelation = queryRelations[0]
		switch (firstRelation.relationType) {
			case QueryRelationType.SUB_QUERY_ROOT:
			case QueryRelationType.ENTITY_ROOT:
				break
			default:
				throw new Error(`First table in FROM clause cannot be joined`)
		}

		let alias = this.queryRelationManager.getAlias(firstRelation)
		this.qValidator.validateReadFromEntity(firstRelation)
		let firstEntity = this.queryRelationManager.createRelatedQEntity(
			firstRelation, context)
		this.qEntityMapByAlias[alias] = firstEntity
		joinTreeNode = new JoinTreeNode(firstRelation, [], null)
		joinTreeNodes.push(joinTreeNode)
		joinNodeMap[alias] = joinTreeNode

		for (let i = 1; i < queryRelations.length; i++) {
			let rightEntity
			let joinRelation = queryRelations[i]
			if (!joinRelation.joinType) {
				throw new Error(`Table ${i + 1} in FROM clause is missing joinType`)
			}
			this.qValidator.validateReadFromEntity(joinRelation)
			alias = this.queryRelationManager.getAlias(joinRelation)
			switch (joinRelation.relationType) {
				case QueryRelationType.SUB_QUERY_ROOT:
					let view = this.addFieldsToView(
						<QueryViewJoinRelation>joinRelation, alias, context)
					this.qEntityMapByAlias[alias] = view as IQEntityInternal
					continue
				case QueryRelationType.ENTITY_ROOT:
					// Non-Joined table
					let nonJoinedEntity = this.queryRelationManager.createRelatedQEntity(
						joinRelation, context)
					this.qEntityMapByAlias[alias] = nonJoinedEntity
					let anotherTree = new JoinTreeNode(joinRelation, [], null)
					if (joinNodeMap[alias]) {
						throw new Error(
							`Alias '${alias}' used more than once in the FROM clause.`)
					}
					joinTreeNodes.push(anotherTree)
					joinNodeMap[alias] = anotherTree
					continue
				case QueryRelationType.ENTITY_APPLICATION_RELATION:
					if (!(<QueryEntityRelation>joinRelation).relationIndex) {
						throw new Error(
							`Table ${i + 1} in FROM clause is missing relationPropertyName`)
					}
					rightEntity = this.queryRelationManager.createRelatedQEntity(
						joinRelation, context)
					break
				case QueryRelationType.SUB_QUERY_JOIN_ON:
					if (!(<QueryJoinRelation>joinRelation).joinWhereClause) {
						this.warn(`View ${i + 1} in FROM clause is missing joinWhereClause`)
					}
					rightEntity = this.addFieldsToView(<QueryViewJoinRelation>joinRelation, alias, context)
					break
				case QueryRelationType.ENTITY_JOIN_ON:
					if (!(<QueryJoinRelation>joinRelation).joinWhereClause) {
						this.warn(`Table ${i + 1} in FROM clause is missing joinWhereClause`)
					}
					rightEntity = this.queryRelationManager.createRelatedQEntity(
						joinRelation, context)
					break
				default:
					throw new Error(`Unknown QueryRelationType ${joinRelation.relationType}`)
			}
			let parentAlias = this.queryRelationManager.getParentAlias(joinRelation)
			if (!joinNodeMap[parentAlias]) {
				throw new Error(
					`Missing parent entity for alias ${parentAlias}, on table ${i + 1} in FROM clause. 
					NOTE: sub-queries in FROM clause cannot reference parent FROM tables.`)
			}
			let leftNode = joinNodeMap[parentAlias]
			let rightNode = new JoinTreeNode(joinRelation, [], leftNode)
			leftNode.addChildNode(rightNode)

			this.qValidator.validateReadFromEntity(joinRelation)
			this.qEntityMapByAlias[alias] = rightEntity
			if (!rightEntity) {
				throw new Error(
					`Could not find entity ${joinRelation.entityIndex} for table ${i + 1} in FROM clause`)
			}
			if (joinNodeMap[alias]) {
				throw new Error(`Alias '${alias}' used more than once in the FROM clause.`)
			}
			joinNodeMap[alias] = rightNode
		}

		return joinTreeNodes
	}

	addFieldsToView(
		viewJoinRelation: QueryViewJoinRelation,
		viewAlias: string,
		context: IFuelHydrantContext,
	): IQTree {
		let view = new QTree(viewJoinRelation.fromClausePosition, null)
		this.addFieldsToViewForSelect(
			view, viewAlias, viewJoinRelation.subQuery.SELECT, 'f',
			null, context)

		return view
	}

	/**
	 * Just build the shell fields for the external API of the view, don't do anything else.
	 * @param view
	 * @param select
	 * @param fieldPrefix
	 */
	addFieldsToViewForSelect(
		view: IQTree,
		viewAlias: string,
		select: any,
		fieldPrefix: string,
		forFieldQueryAlias: string,
		context: IFuelHydrantContext,
	) {
		let fieldIndex = 0
		let hasDistinctClause = false
		for (let fieldName in select) {
			let alias = `${fieldPrefix}${++fieldIndex}`
			let fieldJson: QueryFieldClause = select[fieldName]
			// If its a nested SELECT
			if (!fieldJson.objectType) {
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson,
					`${alias}_`, null, context)
			} else {
				let aliasToSet = forFieldQueryAlias ? forFieldQueryAlias : alias
				hasDistinctClause = hasDistinctClause && this.addFieldToViewForSelect(
					view, viewAlias, fieldPrefix, fieldJson, aliasToSet,
					forFieldQueryAlias, context)
			}
		}
		if (fieldIndex > 1) {
			if (hasDistinctClause) {
				throw new Error(
					`DISTINCT clause must be the only property at its level`)
			}
			if (forFieldQueryAlias) {
				throw new Error(
					`Field queries can have only one field in SELECT clause`)
			}
		}
	}

	addFieldToViewForSelect(
		view: IQTree,
		viewAlias: string,
		fieldPrefix: string,
		fieldJson: QueryFieldClause,
		alias: string,
		forFieldQueryAlias: string = null,
		context: IFuelHydrantContext,
	): boolean {
		let hasDistinctClause = false
		let dbEntity: DbEntity
		let dbProperty: DbProperty
		let dbColumn: DbColumn
		switch (fieldJson.objectType) {
			case QueryClauseObjectType.FIELD_FUNCTION:
				view[alias] = new SqlFunctionField(fieldJson)
				throw new Error('Not implemented')
			case QueryClauseObjectType.EXISTS_FUNCTION:
				throw new Error(`Exists function cannot be used in SELECT clause.`)
			case QueryClauseObjectType.FIELD:
				dbEntity = this.airportDatabase.applications[fieldJson.applicationIndex].currentVersion[0]
					.applicationVersion.entities[fieldJson.entityIndex]
				dbProperty = dbEntity.properties[fieldJson.propertyIndex]
				dbColumn = dbEntity.columns[fieldJson.columnIndex]
				switch (fieldJson.dataType) {
					case SQLDataType.BOOLEAN:
						view[alias] = new QBooleanField(dbColumn, dbProperty,
							view as IQEntityInternal)
						break
					case SQLDataType.DATE:
						view[alias] = new QDateField(dbColumn, dbProperty,
							view as IQEntityInternal)
						break
					case SQLDataType.NUMBER:
						view[alias] = new QNumberField(dbColumn, dbProperty,
							view as IQEntityInternal)
						break
					case SQLDataType.STRING:
						view[alias] = new QStringField(dbColumn, dbProperty,
							view as IQEntityInternal)
						break
					// case SQLDataType.ANY:
					// 	view[alias] = new QUntypedField(dbColumn, dbProperty,
					// 		view as IQEntityInternal<any>)
					// 	break
					default:
						throw new Error(`Unknown SQLDataType: ${fieldJson.dataType}.`)
				}
				break
			case QueryClauseObjectType.FIELD_QUERY:
				let fieldQuery = <QueryField><any>fieldJson
				this.addFieldToViewForSelect(view, viewAlias, fieldPrefix,
					fieldQuery.SELECT, alias, alias, context)
				break
			case QueryClauseObjectType.DISTINCT_FUNCTION:
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson.value,
					fieldPrefix, forFieldQueryAlias, context)
				hasDistinctClause = true
				break
			case QueryClauseObjectType.MANY_TO_ONE_RELATION:
				throw new Error(
					`@ManyToOne fields cannot be directly in a SELECT clause.
					Please select a non-relational field within the relation.`)
			// let relation =
			// <QField<any>><any>QMetadataUtils.getRelationByColumnIndex(this.dbFacade.getQEntityByIndex(fieldJson.entityIndex),
			// fieldJson.columnIndex); view[alias] = relation.getInstance(view); break;
			default:
				throw new Error(
					`Unexpected type property on QueryFieldClause: ${fieldJson.objectType}.`)
		}

		return hasDistinctClause
	}

	protected abstract getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string;

	protected getFieldSelectFragment(
		value: QueryFieldClause,
		clauseType: ClauseType,
		nestedObjectCallBack: { (): string },
		fieldIndex: number,
		context: IFuelHydrantContext,
	): string {
		let columnSelectSqlFragment = this.getFieldValue(value, clauseType,
			// Nested object processing
			nestedObjectCallBack, context)
		if (value.fieldAlias !== undefined) {
			columnSelectSqlFragment += ` as ${value.fieldAlias}`
		}
		if (fieldIndex === 0) {
			return `\n\t${columnSelectSqlFragment}`
		} else {
			return `,\n\t${columnSelectSqlFragment}`
		}
	}

	protected getFROMFragments(
		joinTrees: JoinTreeNode[],
		context: IFuelHydrantContext,
	): string {
		return joinTrees.map(
			joinTree => this.getFROMFragment(
				null, joinTree, context))
			.join('\n')
	}

	protected getFROMFragment(
		parentTree: JoinTreeNode,
		currentTree: JoinTreeNode,
		context: IFuelHydrantContext,
	): string {
		let fromFragment = '\t'
		let currentRelation = currentTree.queryRelation
		let currentAlias = this.queryRelationManager.getAlias(currentRelation)
		let qEntity = this.qEntityMapByAlias[currentAlias]

		if (!parentTree) {
			switch (currentRelation.relationType) {
				case QueryRelationType.ENTITY_ROOT:
					fromFragment += `${this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity, context)} ${currentAlias}`
					break
				case QueryRelationType.SUB_QUERY_ROOT:
					let viewRelation = <QueryViewJoinRelation>currentRelation
					const {
						parameterReferences,
						subQuerySql
					} = this.subStatementSqlGenerator.getTreeQuerySql(
						viewRelation.subQuery, this.dialect, context)
					if (parameterReferences.length) {
						this.parameterReferences = this.parameterReferences.concat(parameterReferences)
					}
					fromFragment += `(${subQuerySql}) ${currentAlias}`
					break
				default:
					throw new Error(
						`Top level FROM entries must be Entity or Sub-Query root`)
			}
		} else {
			let parentRelation = parentTree.queryRelation
			let parentAlias = this.queryRelationManager.getAlias(parentRelation)
			let leftEntity = this.qEntityMapByAlias[parentAlias]

			let rightEntity = this.qEntityMapByAlias[currentAlias]

			let joinTypeString
			switch (currentRelation.joinType) {
				case JoinType.FULL_JOIN:
					joinTypeString = 'FULL JOIN'
					break
				case JoinType.INNER_JOIN:
					joinTypeString = 'INNER JOIN'
					break
				case JoinType.LEFT_JOIN:
					joinTypeString = 'LEFT JOIN'
					break
				case JoinType.RIGHT_JOIN:
					joinTypeString = 'RIGHT JOIN'
				default:
					throw new Error(`Unsupported join type: ${currentRelation.joinType}`)
			}

			let errorPrefix = 'Error building FROM: '

			let joinOnClause
			switch (currentRelation.relationType) {
				case QueryRelationType.ENTITY_JOIN_ON:
					let joinRelation = <QueryJoinRelation>currentRelation
					joinOnClause = this.getWHEREFragment(joinRelation.joinWhereClause, '\t',
						context)
					fromFragment += `\t${joinTypeString} ${this.storeDriver.getEntityTableName(
						qEntity.__driver__.dbEntity, context)} ${currentAlias} ON\n${joinOnClause}`
					break
				case QueryRelationType.ENTITY_APPLICATION_RELATION:
					fromFragment += this.getEntityApplicationRelationFromJoin(
						leftEntity, rightEntity, <QueryEntityRelation>currentRelation,
						parentRelation, currentAlias, parentAlias,
						joinTypeString, errorPrefix, context)
					break
				case QueryRelationType.SUB_QUERY_JOIN_ON:
					let viewJoinRelation = <QueryViewJoinRelation>currentRelation
					const {
						parameterReferences,
						subQuerySql
					} = this.subStatementSqlGenerator.getTreeQuerySql(
						viewJoinRelation.subQuery, this.dialect, context)
					if (parameterReferences.length) {
						this.parameterReferences = this.parameterReferences.concat(parameterReferences)
					}
					joinOnClause = this.getWHEREFragment(
						viewJoinRelation.joinWhereClause, '\t', context)
					fromFragment += `${joinTypeString} (${subQuerySql}) ${currentAlias} ON\n${joinOnClause}`
					break
				default:
					throw new Error(`Nested FROM entries must be Entity JOIN ON
					or Application Relation, or Sub-Query JOIN ON`)

			}
		}
		for (let i = 0; i < currentTree.childNodes.length; i++) {
			let childTreeNode = currentTree.childNodes[i]
			fromFragment += this.getFROMFragment(currentTree, childTreeNode, context)
		}

		return fromFragment
	}

	protected getGroupByFragment(
		groupBy?: QueryFieldInGroupBy[]
	): string {
		return groupBy.map(
			(groupByField) => {
				this.qValidator.validateAliasedFieldAccess(groupByField.fieldAlias)
				return `${groupByField.fieldAlias}`
			})
			.join(', ')
	}

	protected getOrderByFragment(
		orderBy: QueryFieldInOrderBy[]
	): string {
		return orderBy.map(
			(orderByField) => {
				this.qValidator.validateAliasedFieldAccess(orderByField.fieldAlias)
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
