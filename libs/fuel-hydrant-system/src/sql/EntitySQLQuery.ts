import {
	AliasCache,
	IAirportDatabase,
	IApplicationUtils,
	IEntitySelectProperties,
	IQMetadataUtils,
	IRelationManager,
	isID,
	isN,
	isY,
	IUtils,
	JoinTreeNode,
	ReferencedColumnData,
	Y
} from '@airport/air-traffic-control'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	EntityState,
	IEntityStateManager,
	InternalFragments,
	JoinType,
	JsonEntityQuery,
	JSONEntityRelation,
	JSONRelationType,
	QueryResultType
} from '@airport/ground-control'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { IEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser'
import { EntityOrderByParser } from '../orderBy/EntityOrderByParser'
import {
	GraphQueryConfiguration,
	IEntityResultParser
} from '../result/entity/IEntityResultParser'
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory'
import { IValidator } from '../validation/Validator'
import {
	SQLDialect,
	SQLQuery
} from './core/SQLQuery'
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * Represents SQL String query with Entity tree Select clause.
 */
export class EntitySQLQuery<IEP extends IEntitySelectProperties>
	extends SQLQuery<JsonEntityQuery<IEP>> {

	orderByParser: IEntityOrderByParser
	protected finalSelectTree: any
	protected joinTree: JoinTreeNode
	private queryParser: IEntityResultParser
	private columnAliases = new AliasCache()

	constructor(
		jsonQuery: JsonEntityQuery<IEP>,
		dbEntity: DbEntity,
		dialect: SQLDialect,
		queryResultType: QueryResultType,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		entityStateManager: IEntityStateManager,
		protected objectResultParserFactory: IObjectResultParserFactory,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		relationManager: IRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
		protected graphQueryConfiguration?: GraphQueryConfiguration
	) {
		super(jsonQuery, dbEntity, dialect, queryResultType,
			airportDatabase,
			applicationUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			relationManager,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils, context)

		if (graphQueryConfiguration && this.graphQueryConfiguration.strict !== undefined) {
			throw new Error(`"strict" configuration is not yet implemented for 
			QueryResultType.ENTITY_GRAPH`)
		}
		this.finalSelectTree = this.setupSelectFields(this.jsonQuery.S, dbEntity, context)
		this.orderByParser = new EntityOrderByParser(this.finalSelectTree, airportDatabase, qValidator, relationManager, jsonQuery.OB)
	}

	toSQL(
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		let joinNodeMap: { [alias: string]: JoinTreeNode } = {}

		this.joinTree = this.buildFromJoinTree(this.jsonQuery.F, joinNodeMap, context)

		let selectFragment = this.getSELECTFragment(this.dbEntity, this.finalSelectTree, this.joinTree, context)
		let fromFragment = this.getFROMFragment(null, this.joinTree, context)
		let whereFragment = ''
		let jsonQuery = this.jsonQuery
		if (jsonQuery.W) {
			whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '', context)}`
		}
		let orderByFragment = ''
		if (jsonQuery.OB && jsonQuery.OB.length) {
			orderByFragment = `
ORDER BY
${this.orderByParser.getOrderByFragment(this.joinTree, this.qEntityMapByAlias, context)}`
		}

		return `SELECT
	${selectFragment}
FROM
${fromFragment}${whereFragment}${orderByFragment}`
	}

	/**
	 * If bridging is not applied:
	 *
	 * Entities get merged if they are right next to each other in the result set.  If they
	 * are not, they are treated as separate entities - hence, your sort order matters.
	 *
	 * If bridging is applied - all entities get merged - your sort order does not matter.
	 * Might as well disallow sort order for bridged queries (or re-sort in memory)?
	 *
	 * @param results
	 * @returns {any[]}
	 */
	async parseQueryResults(
		results: any[],
		internalFragments: InternalFragments,
		queryResultType: QueryResultType,
		context: IFuelHydrantContext,
		bridgedQueryConfiguration?: any
	): Promise<any[]> {
		this.queryParser = this.objectResultParserFactory.getObjectResultParser(
			this.queryResultType, this.graphQueryConfiguration, this.dbEntity)
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		for (let i = 0; i < results.length; i++) {
			let result = results[i]
			let entityAlias = this.relationManager.getAlias(this.joinTree.jsonRelation)
			this.columnAliases.reset()
			let parsedResult = this.parseQueryResult(this.finalSelectTree, entityAlias, this.joinTree, result, [0], context)
			if (!lastResult) {
				parsedResults.push(parsedResult)
			} else if (lastResult !== parsedResult) {
				parsedResults.push(parsedResult)
			}
			lastResult = parsedResult
			this.queryParser.flushRow()
		}

		return this.queryParser.bridge(parsedResults, this.jsonQuery.S, context)
	}

	protected buildFromJoinTree(
		joinRelations: JSONEntityRelation[],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		context: IFuelHydrantContext,
	): JoinTreeNode {
		let jsonTree: JoinTreeNode
		// For entity queries it is possible to have a query with no from clause, in this case
		// make the query entity the root tree node
		if (joinRelations.length < 1) {
			let onlyJsonRelation: JSONEntityRelation = {
				currentChildIndex: 0,
				ti: this.dbEntity.index,
				fromClausePosition: [],
				jt: null,
				ri: null,
				rt: JSONRelationType.ENTITY_ROOT,
				rep: 'r_',
				si: this.dbEntity.applicationVersion.id
			}
			joinRelations.push(onlyJsonRelation)
		}

		let firstRelation = joinRelations[0]

		switch (firstRelation.rt) {
			case JSONRelationType.ENTITY_ROOT:
				break
			case JSONRelationType.SUB_QUERY_ROOT:
			case JSONRelationType.SUB_QUERY_JOIN_ON:
				throw new Error(`Entity query's FROM clause cannot contain sub-queries`)
			case JSONRelationType.ENTITY_JOIN_ON:
				throw new Error(`Entity queries cannot use JOIN ON`)
			default:
				throw new Error(`First table in FROM clause cannot be result of a join`)
		}

		// if (firstRelation.rt !== JSONRelationType.ENTITY_ROOT) {
		// 	throw new Error(`First table in FROM clause cannot be joined`)
		// }

		let alias = this.relationManager.getAlias(firstRelation)
		let firstEntity = this.relationManager.createRelatedQEntity(firstRelation, context)
		this.qEntityMapByAlias[alias] = firstEntity
		this.jsonRelationMapByAlias[alias] = firstRelation
		// In entity queries the first entity must always be the same as the query entity
		const firstDbEntity = firstEntity.__driver__.dbEntity
		// if (firstEntity.constructor != this.rootQEntity.constructor) {
		if (firstDbEntity.applicationVersion.application.index !== this.dbEntity.applicationVersion.application.index || firstDbEntity.index !== this.dbEntity.index) {
			throw new Error(`ERROR: Unexpected first table in FROM clause: 
			'${firstDbEntity.applicationVersion.application.name}.${firstDbEntity.name}',
			expecting:
			'${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}'`)
		}
		jsonTree = new JoinTreeNode(firstRelation, [], null)

		joinNodeMap[alias] = jsonTree

		for (let i = 1; i < joinRelations.length; i++) {

			let joinRelation = joinRelations[i]
			switch (joinRelation.rt) {
				case JSONRelationType.ENTITY_ROOT:
					throw new Error(`All Entity query tables after the first must be joined`)
				case JSONRelationType.SUB_QUERY_JOIN_ON:
					throw new Error(`Entity queries FROM clause cannot contain sub-queries`)
				case JSONRelationType.ENTITY_JOIN_ON:
					throw new Error(`Entity queries cannot use JOIN ON`)
				default:
					break
			}
			if (!joinRelation.ri && joinRelation.ri !== 0) {
				throw new Error(`Table ${i + 1} in FROM clause is missing 
				relationPropertyName`)
			}
			let parentAlias = this.relationManager.getParentAlias(joinRelation)
			if (!joinNodeMap[parentAlias]) {
				throw new Error(`Missing parent entity for alias ${parentAlias}, 
				on table ${i + 1} in FROM clause`)
			}
			let leftNode = joinNodeMap[parentAlias]
			let rightNode = new JoinTreeNode(joinRelation, [], leftNode)
			leftNode.addChildNode(rightNode)

			alias = this.relationManager.getAlias(joinRelation)
			let rightEntity = this.relationManager.createRelatedQEntity(joinRelation, context)
			this.qEntityMapByAlias[alias] = rightEntity
			this.jsonRelationMapByAlias[alias] = firstRelation
			if (!rightEntity) {
				throw new Error(`Could not find entity ${joinRelation.ti} for 
				table ${i + 1} in FROM clause`)
			}
			if (joinNodeMap[alias]) {
				throw new Error(`Alias '${alias}' used more than once in the FROM clause.`)
			}
			joinNodeMap[alias] = rightNode
		}

		return jsonTree
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		entityAlias: string,
		currentJoinNode: JoinTreeNode,
		resultRow: any,
		nextColumnIndex: number[],
		context: IFuelHydrantContext,
	): any {
		// Return blanks, primitives and Dates directly
		if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
			return resultRow
		}

		let numNonNullColumns = 0

		let qEntity = this.qEntityMapByAlias[entityAlias]
		const dbEntity = qEntity.__driver__.dbEntity

		let resultObject = this.queryParser.addEntity(entityAlias, dbEntity, context)

		for (let propertyName in selectClauseFragment) {
			const dbProperty = dbEntity.propertyMap[propertyName]
			if (!dbProperty.relation || !dbProperty.relation.length) {
				const columnAlias = this.columnAliases.getFollowingAlias()
				const defaultValue = this.entityDefaults.getForAlias(entityAlias)[propertyName]

				const dbColumn = dbProperty.propertyColumns[0].column
				const propertyValue = this.sqlQueryAdapter.getResultCellValue(resultRow, columnAlias, nextColumnIndex[0], dbColumn.type, defaultValue)
				if (this.queryParser.addProperty(entityAlias, resultObject, dbColumn.type, propertyName, propertyValue)) {
					numNonNullColumns++
				}
				nextColumnIndex[0]++
			} else {
				const childSelectClauseFragment = selectClauseFragment[propertyName]
				const dbRelation = dbProperty.relation[0]
				const childDbEntity = dbRelation.relationEntity

				if (childSelectClauseFragment === null || childSelectClauseFragment.__state__ === EntityState.STUB) {
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							let haveRelationValues = false
							let relationInfos: ReferencedColumnData[] = []
							this.applicationUtils.forEachColumnTypeOfRelation(dbRelation, (
								dbColumn: DbColumn,
								propertyNameChains: string[][],
							) => {
								const columnAlias = this.columnAliases.getFollowingAlias()
								let value = this.sqlQueryAdapter.getResultCellValue(resultRow, columnAlias, nextColumnIndex[0], dbColumn.type, null)
								relationInfos.push({
									propertyNameChains: propertyNameChains,
									sqlDataType: dbColumn.type,
									value
								})
								if (this.utils.objectExists(value)) {
									haveRelationValues = true
									numNonNullColumns++
								}
								nextColumnIndex[0]++
							})
							if (haveRelationValues) {
								this.queryParser.bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, childDbEntity, relationInfos, context)
							} else {
								this.queryParser.bufferBlankManyToOneStub(entityAlias, resultObject, propertyName, relationInfos)
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							this.queryParser.bufferOneToManyStub(dbEntity, propertyName)
							break
						default:
							throw new Error(`Unknown relation type '${dbRelation.relationType}' for 
								'${dbEntity.name}.${dbProperty.name}'`)
					}
				} else {
					const childJoinNode = currentJoinNode.getEntityRelationChildNode(dbRelation)
					const childEntityAlias = this.relationManager.getAlias(childJoinNode.jsonRelation)
					const relationQEntity = this.qEntityMapByAlias[childEntityAlias]
					const relationDbEntity = relationQEntity.__driver__.dbEntity

					let childResultObject = this.parseQueryResult(childSelectClauseFragment, childEntityAlias, childJoinNode, resultRow, nextColumnIndex, context)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							if (childResultObject) {
								this.queryParser.bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject, context)
							} else {
								this.queryParser.bufferBlankManyToOneObject(entityAlias, resultObject, propertyName)
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							if (childResultObject) {
								this.queryParser.bufferOneToManyCollection(entityAlias, resultObject, dbEntity, propertyName, relationDbEntity, childResultObject, context)
							} else {
								this.queryParser.bufferBlankOneToMany(entityAlias, resultObject, dbEntity.name, propertyName, relationDbEntity, context)
							}
							break
						default:
							throw new Error(`Unknown relation type '${dbRelation.relationType}' for 
								'${dbEntity.name}.${dbProperty.name}'`)
					}
				}
			}
		}

		if (numNonNullColumns === 0) {
			return null
		}

		let idValue = this.applicationUtils.getIdKey(resultObject, dbEntity)

		return this.queryParser.flushEntity(entityAlias, dbEntity, selectClauseFragment, idValue, resultObject, context)
	}

	/**
	 * Verify that the entity select clause is valid (has ids) and fill in clauses
	 * that are blank (defined as {}).
	 *
	 *
	 * {
	 *  id1: Y,
	 *  id2: {
	 *    subId1: Y
	 *  },
	 *  other1: Y
	 * }
	 *
	 * If no properties are specified all properties are included.
	 *
	 * @param selectClauseFragment
	 * @param {DbEntity} dbEntity
	 * @returns {any}
	 */
	protected setupSelectFields(
		selectClauseFragment: any,
		dbEntity: DbEntity,
		context: IFuelHydrantContext,
		parentDbProperty?: DbProperty
	): any {
		let retrieveAllOwnFields: boolean = true
		let selectFragment
		if (!selectClauseFragment || selectClauseFragment instanceof Array) {
			let ofProperty = ''
			if (parentDbProperty) {
				ofProperty = `(of '${parentDbProperty.entity.name}.${parentDbProperty.name}') `
			}
			throw new Error(`'${dbEntity.name}' Entity SELECT clause ${ofProperty}must be specified as an Object.`)
		} else if (isID(selectFragment)) {
			selectFragment = {}
			retrieveAllOwnFields = false
		} else {
			selectFragment = { ...selectClauseFragment }
		}

		let allFieldsSpecified = false
		if (selectFragment.__allFields__ === true) {
			allFieldsSpecified = true
			delete selectFragment.__allFields__
		}

		const entityDefinitionHasIds = !!dbEntity.idColumns.length
		for (const propertyName in selectFragment) {
			if (!allFieldsSpecified) {
				retrieveAllOwnFields = false
			}

			const dbProperty = dbEntity.propertyMap[propertyName]
			if (!dbProperty) {
				throw new Error(`Entity property '${dbEntity.name}.${propertyName}' does not exist.`)
			}

			const value = selectFragment[propertyName]
			if (value === undefined || value === null || isN(value)) {
				if (dbProperty.isId) {
					throw new Error(`@Id properties cannot be excluded from entity queries.`)
				}
				if (!entityDefinitionHasIds) {
					throw new Error(`Cannot exclude property '${propertyName}' from select clause 
					for '${dbEntity.name}' Entity - entity has no @Id so all properties must be included.`)
				}
				delete selectFragment[propertyName]
				continue
			}
			// Need to differentiate between properties that contain only
			// foreign key ids and properties
			if (dbProperty.relation && dbProperty.relation.length) {
				selectFragment[propertyName] = this.setupSelectFields(value, dbProperty.relation[0].relationEntity, context, dbProperty)
				// } else {
				// 	//  At least one non-relational field is in the original select clause
				// 	retrieveAllOwnFields = false
			} else if (!isY(value)) {

				selectFragment[propertyName] = Y
			}
		}

		//  For {} select causes, entities with no @Id, retrieve the entire object.
		// Otherwise make sure all @Id columns are specified.
		for (const dbProperty of dbEntity.properties) {
			if (entityDefinitionHasIds && !dbProperty.isId && !retrieveAllOwnFields) {
				continue
			}
			const allowDefaults = entityDefinitionHasIds && !dbProperty.isId
			if (dbProperty.relation && dbProperty.relation.length) {
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						break
					case EntityRelationType.MANY_TO_ONE:
						// If select fragment for the child entity is already defined, do not overwrite it
						if (selectFragment[dbProperty.name]) {
							break
						}
						const manyToOneRelation = {}
						this.entityStateManager.markAsStub(manyToOneRelation)
						selectFragment[dbProperty.name] = manyToOneRelation
						// applicationUtils.addRelationToEntitySelectClause(dbRelation, selectFragment,
						// allowDefaults)
						break
					default:
						throw new Error(`Unknown relation type: '${dbRelation.relationType}' 
						on '${dbEntity.name}.${dbProperty.name}'.`)
				}
			} else {
				const value = selectFragment[dbProperty.name]
				if (value !== undefined && value !== null) {
					if (!allowDefaults && !isY(value)) {
						throw new Error(`${entityDefinitionHasIds ? '@Id properties' : 'Entities without @Id'} 
						cannot have default SELECT values.`)
					}
				} else {
					selectFragment[dbProperty.name] = Y
				}
			}
		}

		return selectFragment
	}

	private getSELECTFragment(
		dbEntity: DbEntity,
		selectClauseFragment: any,
		joinTree: JoinTreeNode,
		context: IFuelHydrantContext,
		parentProperty?: DbProperty,
	): string[] {
		const tableAlias = this.relationManager.getAlias(joinTree.jsonRelation)
		let selectSqlFragments = []

		let isStubProperty = this.entityStateManager.isStub(selectClauseFragment)

		const defaults = this.entityDefaults.getForAlias(tableAlias)
		for (let propertyName in selectClauseFragment) {
			if (propertyName === '__state__') {
				continue
			}
			const value = selectClauseFragment[propertyName]
			if (!isY(value)) {
				defaults[propertyName] = value
			}
			const dbProperty = dbEntity.propertyMap[propertyName]
			if (dbProperty.relation && dbProperty.relation.length) {
				const dbRelation = dbProperty.relation[0]
				if (this.entityStateManager.isStub(selectClauseFragment[propertyName])) {
					for (const relationColumn of dbRelation.manyRelationColumns) {
						const dbColumn = relationColumn.manyColumn
						this.addFieldFromColumn(dbColumn)
						const columnSelect = this.getSimpleColumnFragment(tableAlias, dbColumn.name)
						selectSqlFragments.push(`${columnSelect} ${this.columnAliases.getFollowingAlias()}`)
					}
				} else {
					const subSelectFragments = this.getSELECTFragment(dbRelation.relationEntity,
						selectClauseFragment[propertyName], joinTree.getEntityRelationChildNode(dbRelation),
						context, dbProperty)
					selectSqlFragments = selectSqlFragments.concat(subSelectFragments)
				}
			} else {
				const dbColumn = dbProperty.propertyColumns[0].column
				this.addFieldFromColumn(dbColumn)
				const columnSelect = this.getSimpleColumnFragment(tableAlias, dbColumn.name)
				selectSqlFragments.push(`${columnSelect} ${this.columnAliases.getFollowingAlias()}`)
			}
		}

		return selectSqlFragments
	}

	private getFROMFragment(
		parentTree: JoinTreeNode,
		currentTree: JoinTreeNode,
		context: IFuelHydrantContext,
	): string {
		let fromFragment = '\t'
		let currentRelation = currentTree.jsonRelation
		let currentAlias = this.relationManager.getAlias(currentRelation)
		let qEntity = this.qEntityMapByAlias[currentAlias]
		let tableName = this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity, context)

		if (!parentTree) {
			fromFragment += `${tableName} ${currentAlias}`
		} else {
			let parentRelation = parentTree.jsonRelation
			let parentAlias = this.relationManager.getAlias(parentRelation)
			let leftEntity = this.qEntityMapByAlias[parentAlias]

			let rightEntity = this.qEntityMapByAlias[currentAlias]

			let joinTypeString
			switch (currentRelation.jt) {
				case JoinType.FULL_JOIN:
					throw new Error(`Full Joins are not allowed in Entity queries.`)
				case JoinType.INNER_JOIN:
					joinTypeString = 'INNER JOIN'
					break
				case JoinType.LEFT_JOIN:
					joinTypeString = 'LEFT JOIN'
					break
				case JoinType.RIGHT_JOIN:
					throw new Error(`Right Joins are not allowed in Entity queries.`)
				default:
					throw new Error(`Unsupported join type: ${currentRelation.jt}`)
			}

			let errorPrefix = 'Error building FROM: '
			switch (currentRelation.rt) {
				case JSONRelationType.ENTITY_APPLICATION_RELATION:
					fromFragment += this.getEntityApplicationRelationFromJoin(leftEntity, rightEntity,
						<JSONEntityRelation>currentRelation, parentRelation, currentAlias, parentAlias,
						joinTypeString, errorPrefix, context)
					break
				default:
					throw new Error(`Only Entity application relations are allowed in Entity query FROM clause.`)
			}
		}
		for (let i = 0; i < currentTree.childNodes.length; i++) {
			let childTreeNode = currentTree.childNodes[i]
			fromFragment += this.getFROMFragment(currentTree, childTreeNode, context)
		}

		return fromFragment
	}

}
