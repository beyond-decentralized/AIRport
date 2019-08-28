import {
	AliasCache,
	IAirportDatabase,
	IEntitySelectProperties,
	IQMetadataUtils,
	ISchemaUtils,
	isID,
	isN,
	isStub,
	isY,
	JoinTreeNode,
	markAsStub,
	objectExists,
	QRelation,
	ReferencedColumnData,
	Y
}                             from '@airport/air-control'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	IStoreDriver,
	JoinType,
	JsonEntityQuery,
	JSONEntityRelation,
	JSONRelationType,
	QueryResultType
}                             from '@airport/ground-control'
import {IEntityOrderByParser} from '../orderBy/AbstractEntityOrderByParser'
import {EntityOrderByParser}  from '../orderBy/EntityOrderByParser'
import {
	getObjectResultParser,
	GraphQueryConfiguration,
	IEntityResultParser
}                             from '../result/entity/IEntityResultParser'
import {
	SQLDialect,
	SQLQuery
}                             from './core/SQLQuery'

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * Represents SQL String query with Entity tree Select clause.
 */
export class EntitySQLQuery<IEP extends IEntitySelectProperties>
	extends SQLQuery<JsonEntityQuery<IEP>> {

	protected finalSelectTree: any
	orderByParser: IEntityOrderByParser
	protected joinTree: JoinTreeNode
	private queryParser: IEntityResultParser
	private columnAliases = new AliasCache()

	constructor(
		jsonQuery: JsonEntityQuery<IEP>,
		dbEntity: DbEntity,
		dialect: SQLDialect,
		queryResultType: QueryResultType,
		schemaUtils: ISchemaUtils,
		storeDriver: IStoreDriver,
		protected graphQueryConfiguration?: GraphQueryConfiguration
	) {
		super(jsonQuery, dbEntity, dialect, queryResultType, storeDriver)
		if (graphQueryConfiguration && this.graphQueryConfiguration.strict !== undefined) {
			throw new Error(`"strict" configuration is not yet implemented for 
			QueryResultType.ENTITY_GRAPH`)
		}
		this.finalSelectTree = this.setupSelectFields(this.jsonQuery.S, dbEntity, schemaUtils)
		this.orderByParser   = new EntityOrderByParser(this.finalSelectTree, this.validator, jsonQuery.OB)
	}

	toSQL(
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		let joinNodeMap: { [alias: string]: JoinTreeNode } = {}

		this.joinTree = this.buildFromJoinTree(
			this.jsonQuery.F, joinNodeMap, airDb, schemaUtils)

		let selectFragment = this.getSELECTFragment(this.dbEntity, this.finalSelectTree, this.joinTree)
		let fromFragment   = this.getFROMFragment(
			null, this.joinTree,
			airDb, schemaUtils, metadataUtils)
		let whereFragment  = ''
		let jsonQuery      = this.jsonQuery
		if (jsonQuery.W) {
			whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '',
				airDb, schemaUtils, metadataUtils)}`
		}
		let orderByFragment = ''
		if (jsonQuery.OB && jsonQuery.OB.length) {
			orderByFragment = `
ORDER BY
${this.orderByParser.getOrderByFragment(this.joinTree, this.qEntityMapByAlias, airDb)}`
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
	parseQueryResults(
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		results: any[]
	): any[] {
		this.queryParser         = getObjectResultParser(
			this.queryResultType, this.graphQueryConfiguration, this.dbEntity)
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		for (let i = 0; i < results.length; i++) {
			let result      = results[i]
			let entityAlias = QRelation.getAlias(this.joinTree.jsonRelation)
			this.columnAliases.reset()
			let parsedResult = this.parseQueryResult(
				this.finalSelectTree, entityAlias, this.joinTree, result,
				[0], airDb, schemaUtils)
			if (!lastResult) {
				parsedResults.push(parsedResult)
			} else if (lastResult !== parsedResult) {
				parsedResults.push(parsedResult)
			}
			lastResult = parsedResult
			this.queryParser.flushRow()
		}

		return this.queryParser.bridge(
			parsedResults, this.jsonQuery.S, schemaUtils)
	}

	protected buildFromJoinTree(
		joinRelations: JSONEntityRelation[],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): JoinTreeNode {
		let jsonTree: JoinTreeNode
		// For entity queries it is possible to have a query with no from clause, in this case
		// make the query entity the root tree node
		if (joinRelations.length < 1) {
			let onlyJsonRelation: JSONEntityRelation = {
				cci: 0,
				ti: this.dbEntity.index,
				fcp: [],
				jt: null,
				ri: null,
				rt: JSONRelationType.ENTITY_ROOT,
				rep: 'r_',
				si: this.dbEntity.index
			}
			joinRelations.push(onlyJsonRelation)
		}

		let firstRelation = joinRelations[0]

		switch (firstRelation.rt) {
			case JSONRelationType.ENTITY_ROOT:
				break
			case JSONRelationType.SUB_QUERY_ROOT:
			case JSONRelationType.SUB_QUERY_JOIN_ON:
				throw new Error(
					`Entity queries FROM clause cannot contain sub-queries`)
			case JSONRelationType.ENTITY_JOIN_ON:
				throw new Error(`Entity queries cannot use JOIN ON`)
			default:
				throw new Error(`First table in FROM clause cannot be joined`)
		}

		if (firstRelation.rt !== JSONRelationType.ENTITY_ROOT) {
			throw new Error(`First table in FROM clause cannot be joined`)
		}

		let alias                          = QRelation.getAlias(firstRelation)
		let firstEntity                    = QRelation.createRelatedQEntity(
			firstRelation, airDb, schemaUtils)
		this.qEntityMapByAlias[alias]      = firstEntity
		this.jsonRelationMapByAlias[alias] = firstRelation
		// In entity queries the first entity must always be the same as the query entity
		const firstDbEntity                = firstEntity.__driver__.dbEntity
		// if (firstEntity.constructor != this.rootQEntity.constructor) {
		if (firstDbEntity.schemaVersion.schema.index !== this.dbEntity.schemaVersion.schema.index
			|| firstDbEntity.index !== this.dbEntity.index) {
			throw new Error(`ERROR: Unexpected first table in FROM clause: 
			'${firstDbEntity.schemaVersion.schema.name}.${firstDbEntity.name}',
			expecting:
			'${this.dbEntity.schemaVersion.schema.name}.${this.dbEntity.name}'`)
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
			if (!joinRelation.ri) {
				throw new Error(`Table ${i + 1} in FROM clause is missing 
				relationPropertyName`)
			}
			let parentAlias = QRelation.getParentAlias(joinRelation)
			if (!joinNodeMap[parentAlias]) {
				throw new Error(`Missing parent entity for alias ${parentAlias}, 
				on table ${i + 1} in FROM clause`)
			}
			let leftNode  = joinNodeMap[parentAlias]
			let rightNode = new JoinTreeNode(joinRelation, [], leftNode)
			leftNode.addChildNode(rightNode)

			alias                              = QRelation.getAlias(joinRelation)
			let rightEntity                    = QRelation.createRelatedQEntity(
				joinRelation, airDb, schemaUtils)
			this.qEntityMapByAlias[alias]      = rightEntity
			this.jsonRelationMapByAlias[alias] = firstRelation
			if (!rightEntity) {
				throw new Error(`Could not find entity ${joinRelation.ti} for 
				table ${i + 1} in FROM clause`)
			}
			if (joinNodeMap[alias]) {
				throw new Error(
					`Alias '${alias}' used more than once in the FROM clause.`)
			}
			joinNodeMap[alias] = rightNode
		}

		return jsonTree
	}

	private getSELECTFragment(
		dbEntity: DbEntity,
		selectClauseFragment: any,
		joinTree: JoinTreeNode,
		parentProperty?: DbProperty
	): string[] {
		const tableAlias       = QRelation.getAlias(joinTree.jsonRelation)
		let selectSqlFragments = []

		let isStubProperty = isStub(selectClauseFragment)

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
				if (isStub(selectClauseFragment[propertyName])) {
					for (const relationColumn of dbRelation.manyRelationColumns) {
						const dbColumn = relationColumn.manyColumn
						this.addFieldFromColumn(dbColumn)
						const columnSelect = this.getSimpleColumnFragment(tableAlias, dbColumn.name)
						selectSqlFragments.push(`${columnSelect} ${this.columnAliases.getFollowingAlias()}`)
					}
				} else {
					const subSelectFragments = this.getSELECTFragment(
						dbRelation.relationEntity,
						selectClauseFragment[propertyName],
						joinTree.getEntityRelationChildNode(dbRelation),
						dbProperty)
					selectSqlFragments       = selectSqlFragments.concat(subSelectFragments)
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

	protected parseQueryResult(
		selectClauseFragment: any,
		entityAlias: string,
		currentJoinNode: JoinTreeNode,
		resultRow: any,
		nextFieldIndex: number[],
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): any {
		// Return blanks, primitives and Dates directly
		if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
			return resultRow
		}

		let numNonNullColumns = 0

		let qEntity    = this.qEntityMapByAlias[entityAlias]
		const dbEntity = qEntity.__driver__.dbEntity

		let resultObject = this.queryParser.addEntity(
			entityAlias, dbEntity, airDb, schemaUtils)

		for (let propertyName in selectClauseFragment) {
			const dbProperty = dbEntity.propertyMap[propertyName]
			if (!dbProperty.relation || !dbProperty.relation.length) {
				const columnAlias  = this.columnAliases.getFollowingAlias()
				const defaultValue = this.entityDefaults.getForAlias(entityAlias)[propertyName]

				const dbColumn      = dbProperty.propertyColumns[0].column
				const propertyValue = this.sqlAdaptor.getResultCellValue(
					resultRow, columnAlias, nextFieldIndex[0], dbColumn.type, defaultValue)
				if (this.queryParser.addProperty(entityAlias, resultObject, dbColumn.type, propertyName, propertyValue)) {
					numNonNullColumns++
				}
				nextFieldIndex[0]++
			} else {
				const childSelectClauseFragment = selectClauseFragment[propertyName]
				const dbRelation                = dbProperty.relation[0]
				const childDbEntity             = dbRelation.relationEntity

				if (childSelectClauseFragment === null) {
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							let haveRelationValues = true
							let relationInfos: ReferencedColumnData[]
							schemaUtils.forEachColumnTypeOfRelation(dbRelation, (
								dbColumn: DbColumn,
								propertyNameChains: string[][],
							) => {
								const columnAlias = this.columnAliases.getFollowingAlias()
								let value         = this.sqlAdaptor.getResultCellValue(
									resultRow, columnAlias, nextFieldIndex[0], dbColumn.type, null)
								relationInfos.push({
									propertyNameChains: propertyNameChains,
									sqlDataType: dbColumn.type,
									value
								})
								if (objectExists(value)) {
									haveRelationValues = true
									numNonNullColumns++
								}
							})
							if (haveRelationValues) {
								this.queryParser.bufferManyToOneStub(
									entityAlias, dbEntity, resultObject, propertyName, childDbEntity,
									relationInfos, schemaUtils)
							} else {
								this.queryParser.bufferBlankManyToOneStub(entityAlias, resultObject, propertyName, relationInfos)
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							this.queryParser.bufferOneToManyStub(dbEntity, propertyName)
							break
						default:
							throw new Error(
								`Unknown relation type '${dbRelation.relationType}' for 
								'${dbEntity.name}.${dbProperty.name}'`)
					}
					nextFieldIndex[0]++
				} else {
					const childJoinNode    = currentJoinNode.getEntityRelationChildNode(dbRelation)
					const childEntityAlias = QRelation.getAlias(childJoinNode.jsonRelation)
					const relationQEntity  = this.qEntityMapByAlias[childEntityAlias]
					const relationDbEntity = relationQEntity.__driver__.dbEntity

					let childResultObject = this.parseQueryResult(
						childSelectClauseFragment,
						childEntityAlias,
						childJoinNode,
						resultRow,
						nextFieldIndex,
						airDb,
						schemaUtils
					)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							if (childResultObject) {
								this.queryParser.bufferManyToOneObject(entityAlias, dbEntity,
									resultObject, propertyName, relationDbEntity,
									childResultObject, schemaUtils)
							} else {
								this.queryParser.bufferBlankManyToOneObject(entityAlias, resultObject, propertyName)
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							if (childResultObject) {
								this.queryParser.bufferOneToManyCollection(
									entityAlias, resultObject, dbEntity, propertyName,
									relationDbEntity, childResultObject, schemaUtils)
							} else {
								this.queryParser.bufferBlankOneToMany(
									entityAlias, resultObject, dbEntity.name, propertyName,
									relationDbEntity, schemaUtils)
							}
							break
						default:
							throw new Error(
								`Unknown relation type '${dbRelation.relationType}' for 
								'${dbEntity.name}.${dbProperty.name}'`)
					}
				}
			}
		}

		if (numNonNullColumns === 0) {
			return null
		}

		let idValue = schemaUtils.getIdKey(resultObject, dbEntity)

		return this.queryParser.flushEntity(
			entityAlias,
			dbEntity,
			selectClauseFragment,
			idValue,
			resultObject,
			schemaUtils
		)
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
	private setupSelectFields(
		selectClauseFragment: any,
		dbEntity: DbEntity,
		schemaUtils: ISchemaUtils,
		parentDbProperty?: DbProperty
	): any {
		let retrieveAllOwnFields: boolean = true
		let selectFragment
		if (!selectClauseFragment || selectClauseFragment instanceof Array) {
			let ofProperty = ''
			if (parentDbProperty) {
				ofProperty = `(of '${parentDbProperty.entity.name}.${parentDbProperty.name}') `
			}
			throw new Error(
				`'${dbEntity.name}' Entity SELECT clause ${ofProperty}must be specified as an Object.`)
		} else if (isID(selectFragment)) {
			selectFragment       = {}
			retrieveAllOwnFields = false
		} else {
			selectFragment = {...selectClauseFragment}
		}

		const entityDefinitionHasIds = !!dbEntity.idColumns.length
		for (const propertyName in selectFragment) {
			retrieveAllOwnFields = false

			const dbProperty = dbEntity.propertyMap[propertyName]
			if (!dbProperty) {
				throw new Error(
					`Entity property '${dbEntity.name}.${propertyName}' does not exist.`)
			}

			const value = selectFragment[propertyName]
			if (value === undefined || value === null || isN(value)) {
				if (dbProperty.isId) {
					throw new Error(
						`@Id properties cannot be excluded from entity queries.`)
				}
				if (!entityDefinitionHasIds) {
					throw new Error(
						`Cannot exclude property '${propertyName}' from select clause 
					for '${dbEntity.name}' Entity - entity has no @Id so all properties must be included.`)
				}
				delete selectFragment[propertyName]
				continue
			}
			// Need to differentiate between properties that contain only
			// foreign key ids and properties
			if (dbProperty.relation && dbProperty.relation.length) {
				selectFragment[propertyName] = this.setupSelectFields(value,
					dbProperty.relation[0].relationEntity, schemaUtils, dbProperty)
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
						const manyToOneRelation = {}
						markAsStub(manyToOneRelation)
						selectFragment[dbProperty.name] = manyToOneRelation
						// schemaUtils.addRelationToEntitySelectClause(dbRelation, selectFragment,
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

	private getFROMFragment(
		parentTree: JoinTreeNode,
		currentTree: JoinTreeNode,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		let fromFragment    = '\t'
		let currentRelation = currentTree.jsonRelation
		let currentAlias    = QRelation.getAlias(currentRelation)
		let qEntity         = this.qEntityMapByAlias[currentAlias]
		let tableName       = schemaUtils.getTableName(qEntity.__driver__.dbEntity)

		if (!parentTree) {
			fromFragment += `${tableName} ${currentAlias}`
		} else {
			let parentRelation = parentTree.jsonRelation
			let parentAlias    = QRelation.getAlias(parentRelation)
			let leftEntity     = this.qEntityMapByAlias[parentAlias]

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
				case JSONRelationType.ENTITY_SCHEMA_RELATION:
					fromFragment += this.getEntitySchemaRelationFromJoin(leftEntity, rightEntity,
						<JSONEntityRelation>currentRelation, parentRelation, currentAlias, parentAlias,
						joinTypeString, errorPrefix, airDb, schemaUtils, metadataUtils)
					break
				default:
					throw new Error(
						`Only Entity schema relations are allowed in Entity query FROM clause.`)
			}
		}
		for (let i = 0; i < currentTree.childNodes.length; i++) {
			let childTreeNode = currentTree.childNodes[i]
			fromFragment += this.getFROMFragment(
				currentTree, childTreeNode, airDb, schemaUtils, metadataUtils)
		}

		return fromFragment
	}

}
