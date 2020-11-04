import {
	IAirportDatabase,
	IQEntityInternal,
	IQMetadataUtils,
	IQTree,
	ISchemaUtils,
	JoinTreeNode,
	QBooleanField,
	QDateField,
	QNumberField,
	QRelation,
	QStringField,
	QTree,
	QUntypedField,
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	InternalFragments,
	IStoreDriver,
	JoinType,
	JSONClauseField,
	JSONClauseObjectType,
	JSONEntityRelation,
	JSONFieldInGroupBy,
	JSONFieldInOrderBy,
	JsonFieldQuery,
	JSONJoinRelation,
	JsonNonEntityQuery,
	JSONRelation,
	JSONRelationType,
	JSONViewJoinRelation,
	QueryResultType,
	SortOrder,
	SQLDataType
}                                from '@airport/ground-control'
import {
	Q_VALIDATOR,
	SQL_QUERY_ADAPTOR
}                                from '../tokens'
import {INonEntityOrderByParser} from '../orderBy/AbstractEntityOrderByParser'
import {
	SQLDialect,
	SQLQuery
}                                from './core/SQLQuery'
import {ClauseType}              from './core/SQLWhereBase'
import {SqlFunctionField}        from './SqlFunctionField'
import {TreeSQLQuery}            from './TreeSQLQuery'

declare function require(moduleName: string): any;

/**
 * Created by Papa on 10/28/2016.
 */

export abstract class NonEntitySQLQuery<JNEQ extends JsonNonEntityQuery>
	extends SQLQuery<JNEQ> {

	protected joinTrees: JoinTreeNode[]
	protected orderByParser: INonEntityOrderByParser


	constructor(
		jsonQuery: JNEQ,
		dialect: SQLDialect,
		queryResultType: QueryResultType,
		storeDriver: IStoreDriver
	) {
		super(jsonQuery, null, dialect, queryResultType, storeDriver)
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
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		const sqlAdaptor = DI.db().getSync(SQL_QUERY_ADAPTOR)
		let jsonQuery      = <JsonNonEntityQuery>this.jsonQuery
		let joinNodeMap: { [alias: string]: JoinTreeNode }
		                   = {}
		this.joinTrees     = this.buildFromJoinTree(
			jsonQuery.F, joinNodeMap, airDb, schemaUtils)
		let selectFragment = this.getSELECTFragment(
			false, jsonQuery.S, internalFragments,
			airDb, schemaUtils, metadataUtils)
		let fromFragment   = this.getFROMFragments(
			this.joinTrees, airDb, schemaUtils, metadataUtils)
		let whereFragment  = ''
		if (jsonQuery.W) {
			whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '',
				airDb, schemaUtils, metadataUtils)}`
		}
		let groupByFragment = ''
		if (jsonQuery.GB && jsonQuery.GB.length) {
			groupByFragment = `
GROUP BY
${this.getGroupByFragment(jsonQuery.GB)}`
		}
		let havingFragment = ''
		if (jsonQuery.H) {
			havingFragment = `
HAVING
${this.getWHEREFragment(jsonQuery.H, '',
				airDb, schemaUtils, metadataUtils)}`
		}
		let orderByFragment = ''
		if (jsonQuery.OB && jsonQuery.OB.length) {
			orderByFragment = `
ORDER BY
	${this.orderByParser.getOrderByFragment(jsonQuery.S, jsonQuery.OB)}`
		}
		let offsetFragment = ''
		if (jsonQuery.O) {
			offsetFragment = sqlAdaptor.getOffsetFragment(jsonQuery.O)
		}
		let limitFragment = ''
		if (jsonQuery.L) {
			offsetFragment = sqlAdaptor.getLimitFragment(jsonQuery.L)
		}

		return `SELECT${selectFragment}
FROM
${fromFragment}${whereFragment}${groupByFragment}${havingFragment}${orderByFragment}${offsetFragment}${limitFragment}`
	}

	protected abstract getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		internalFragments: InternalFragments,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string;

	protected getFieldSelectFragment(
		value: JSONClauseField,
		clauseType: ClauseType,
		nestedObjectCallBack: { (): string },
		fieldIndex: number,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	) {
		let columnSelectSqlFragment = this.getFieldValue(value, clauseType,
			// Nested object processing
			nestedObjectCallBack, airDb, schemaUtils, metadataUtils)
		if (value.fa !== undefined) {
			columnSelectSqlFragment += ` as ${value.fa}`
		}
		if (fieldIndex === 0) {
			return `\n\t${columnSelectSqlFragment}`
		} else {
			return `\n\t, ${columnSelectSqlFragment}`
		}
	}

	buildFromJoinTree(
		joinRelations: JSONRelation[],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): JoinTreeNode[] {
		const validator = DI.db().getSync(Q_VALIDATOR)
		let jsonTrees: JoinTreeNode[] = []
		let jsonTree: JoinTreeNode

		// For entity queries it is possible to have a query with no from clause, in this case
		// make the query entity the root tree node
		if (joinRelations.length < 1) {
			throw new Error(
				`FROM clause must have entries for non-Entity queries`)
		}

		let firstRelation = joinRelations[0]
		switch (firstRelation.rt) {
			case JSONRelationType.SUB_QUERY_ROOT:
			case JSONRelationType.ENTITY_ROOT:
				break
			default:
				throw new Error(`First table in FROM clause cannot be joined`)
		}

		let alias = QRelation.getAlias(firstRelation)
		validator.validateReadFromEntity(firstRelation)
		let firstEntity               = QRelation.createRelatedQEntity(
			firstRelation, airDb, schemaUtils)
		this.qEntityMapByAlias[alias] = firstEntity
		jsonTree                      = new JoinTreeNode(firstRelation, [], null)
		jsonTrees.push(jsonTree)
		joinNodeMap[alias] = jsonTree

		for (let i = 1; i < joinRelations.length; i++) {
			let rightEntity
			let joinRelation = joinRelations[i]
			if (!joinRelation.jt) {
				throw new Error(`Table ${i + 1} in FROM clause is missing joinType`)
			}
			validator.validateReadFromEntity(joinRelation)
			alias = QRelation.getAlias(joinRelation)
			switch (joinRelation.rt) {
				case JSONRelationType.SUB_QUERY_ROOT:
					let view                      = this.addFieldsToView(
						<JSONViewJoinRelation>joinRelation, alias, airDb, schemaUtils)
					this.qEntityMapByAlias[alias] = view as IQEntityInternal
					continue
				case JSONRelationType.ENTITY_ROOT:
					// Non-Joined table
					let nonJoinedEntity           = QRelation.createRelatedQEntity(
						joinRelation, airDb, schemaUtils)
					this.qEntityMapByAlias[alias] = nonJoinedEntity
					let anotherTree               = new JoinTreeNode(joinRelation, [], null)
					if (joinNodeMap[alias]) {
						throw new Error(
							`Alias '${alias}' used more than once in the FROM clause.`)
					}
					jsonTrees.push(anotherTree)
					joinNodeMap[alias] = anotherTree
					continue
				case JSONRelationType.ENTITY_SCHEMA_RELATION:
					if (!(<JSONEntityRelation>joinRelation).ri) {
						throw new Error(
							`Table ${i + 1} in FROM clause is missing relationPropertyName`)
					}
					rightEntity = QRelation.createRelatedQEntity(
						joinRelation, airDb, schemaUtils)
					break
				case JSONRelationType.SUB_QUERY_JOIN_ON:
					if (!(<JSONJoinRelation>joinRelation).jwc) {
						this.warn(`View ${i + 1} in FROM clause is missing joinWhereClause`)
					}
					rightEntity = this.addFieldsToView(<JSONViewJoinRelation>joinRelation, alias,
						airDb, schemaUtils)
					break
				case JSONRelationType.ENTITY_JOIN_ON:
					if (!(<JSONJoinRelation>joinRelation).jwc) {
						this.warn(`Table ${i + 1} in FROM clause is missing joinWhereClause`)
					}
					rightEntity = QRelation.createRelatedQEntity(
						joinRelation, airDb, schemaUtils)
					break
				default:
					throw new Error(`Unknown JSONRelationType ${joinRelation.rt}`)
			}
			let parentAlias = QRelation.getParentAlias(joinRelation)
			if (!joinNodeMap[parentAlias]) {
				throw new Error(
					`Missing parent entity for alias ${parentAlias}, on table ${i + 1} in FROM clause. 
					NOTE: sub-queries in FROM clause cannot reference parent FROM tables.`)
			}
			let leftNode  = joinNodeMap[parentAlias]
			let rightNode = new JoinTreeNode(joinRelation, [], leftNode)
			leftNode.addChildNode(rightNode)

			validator.validateReadFromEntity(joinRelation)
			this.qEntityMapByAlias[alias] = rightEntity
			if (!rightEntity) {
				throw new Error(
					`Could not find entity ${joinRelation.ti} for table ${i + 1} in FROM clause`)
			}
			if (joinNodeMap[alias]) {
				throw new Error(`Alias '${alias}' used more than once in the FROM clause.`)
			}
			joinNodeMap[alias] = rightNode
		}

		return jsonTrees
	}

	addFieldsToView(
		viewJoinRelation: JSONViewJoinRelation,
		viewAlias: string,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): IQTree {
		let view = new QTree(viewJoinRelation.fcp, null)
		this.addFieldsToViewForSelect(
			view, viewAlias, viewJoinRelation.sq.S, 'f',
			null, airDb, schemaUtils)

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
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	) {
		let fieldIndex        = 0
		let hasDistinctClause = false
		for (let fieldName in select) {
			let alias                      = `${fieldPrefix}${++fieldIndex}`
			let fieldJson: JSONClauseField = select[fieldName]
			// If its a nested select
			if (!fieldJson.ot) {
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson,
					`${alias}_`, null, airDb, schemaUtils)
			} else {
				let aliasToSet    = forFieldQueryAlias ? forFieldQueryAlias : alias
				hasDistinctClause = hasDistinctClause && this.addFieldToViewForSelect(
					view, viewAlias, fieldPrefix, fieldJson, aliasToSet,
					forFieldQueryAlias, airDb, schemaUtils)
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
		fieldJson: JSONClauseField,
		alias: string,
		forFieldQueryAlias: string = null,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils
	): boolean {
		let hasDistinctClause = false
		let dbEntity: DbEntity
		let dbProperty: DbProperty
		let dbColumn: DbColumn
		switch (fieldJson.ot) {
			case JSONClauseObjectType.FIELD_FUNCTION:
				view[alias] = new SqlFunctionField(fieldJson)
				throw new Error('Not implemented')
			case JSONClauseObjectType.EXISTS_FUNCTION:
				throw new Error(`Exists function cannot be used in SELECT clause.`)
			case JSONClauseObjectType.FIELD:
				dbEntity   = airDb.schemas[fieldJson.si].currentVersion.entities[fieldJson.ti]
				dbProperty = dbEntity.properties[fieldJson.pi]
				dbColumn   = dbEntity.columns[fieldJson.ci]
				switch (fieldJson.dt) {
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
					case SQLDataType.ANY:
						view[alias] = new QUntypedField(dbColumn, dbProperty,
							view as IQEntityInternal)
						break
					default:
						throw new Error(`Unknown SQLDataType: ${fieldJson.dt}.`)
				}
				break
			case JSONClauseObjectType.FIELD_QUERY:
				let fieldQuery = <JsonFieldQuery><any>fieldJson
				this.addFieldToViewForSelect(view, viewAlias, fieldPrefix,
					fieldQuery.S, alias, alias, airDb, schemaUtils)
				break
			case JSONClauseObjectType.DISTINCT_FUNCTION:
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson.v,
					fieldPrefix, forFieldQueryAlias, airDb, schemaUtils)
				hasDistinctClause = true
				break
			case JSONClauseObjectType.MANY_TO_ONE_RELATION:
				throw new Error(
					`@ManyToOne fields cannot be directly in a select clause.
					Please select a non-relational field within the relation.`)
			// let relation =
			// <QField<any>><any>QMetadataUtils.getRelationByColumnIndex(this.dbFacade.getQEntityByIndex(fieldJson.ti),
			// fieldJson.ci); view[alias] = relation.getInstance(view); break;
			default:
				throw new Error(
					`Unexpected type property on JSONClauseField: ${fieldJson.ot}.`)
		}

		return hasDistinctClause
	}


	private getFROMFragments(
		joinTrees: JoinTreeNode[],
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		return joinTrees.map(
			joinTree => this.getFROMFragment(
				null, joinTree, airDb, schemaUtils, metadataUtils)).join('\n')
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

		if (!parentTree) {
			switch (currentRelation.rt) {
				case JSONRelationType.ENTITY_ROOT:
					fromFragment += `${this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity)} ${currentAlias}`
					break
				case JSONRelationType.SUB_QUERY_ROOT:
					let viewRelation                           = <JSONViewJoinRelation>currentRelation
					let TreeSQLQueryClass: typeof TreeSQLQuery = require('./TreeSQLQuery').TreeSQLQuery
					let subQuery                               = new TreeSQLQueryClass(
						viewRelation.sq, this.dialect, this.storeDriver)
					const subQuerySql                          = subQuery.toSQL({}, airDb, schemaUtils, metadataUtils)
					fromFragment += `(${subQuerySql}) ${currentAlias}`
					break
				default:
					throw new Error(
						`Top level FROM entries must be Entity or Sub-Query root`)
			}
		} else {
			let parentRelation = parentTree.jsonRelation
			let parentAlias    = QRelation.getAlias(parentRelation)
			let leftEntity     = this.qEntityMapByAlias[parentAlias]

			let rightEntity = this.qEntityMapByAlias[currentAlias]

			let joinTypeString
			switch (currentRelation.jt) {
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
					throw new Error(`Unsupported join type: ${currentRelation.jt}`)
			}

			let errorPrefix = 'Error building FROM: '

			let joinOnClause
			switch (currentRelation.rt) {
				case JSONRelationType.ENTITY_JOIN_ON:
					let joinRelation = <JSONJoinRelation>currentRelation
					joinOnClause     = this.getWHEREFragment(joinRelation.jwc, '\t',
						airDb, schemaUtils, metadataUtils)
					fromFragment += `\t${joinTypeString} ${this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity)} ${currentAlias} ON\n${joinOnClause}`
					break
				case JSONRelationType.ENTITY_SCHEMA_RELATION:
					fromFragment += this.getEntitySchemaRelationFromJoin(
						leftEntity, rightEntity, <JSONEntityRelation>currentRelation,
						parentRelation, currentAlias, parentAlias,
						joinTypeString, errorPrefix, airDb, schemaUtils, metadataUtils)
					break
				case JSONRelationType.SUB_QUERY_JOIN_ON:
					let viewJoinRelation                       = <JSONViewJoinRelation>currentRelation
					let TreeSQLQueryClass: typeof TreeSQLQuery = require('./TreeSQLQuery').TreeSQLQuery
					let mappedSqlQuery                         = new TreeSQLQueryClass(
						viewJoinRelation.sq, this.dialect, this.storeDriver)
					joinOnClause                               = this.getWHEREFragment(
						viewJoinRelation.jwc, '\t',
						airDb, schemaUtils, metadataUtils)
					const mappedSql                            = mappedSqlQuery.toSQL(
						{}, airDb, schemaUtils, metadataUtils)
					fromFragment += `${joinTypeString} (${mappedSql}) ${currentAlias} ON\n${joinOnClause}`
					break
				default:
					throw new Error(`Nested FROM entries must be Entity JOIN ON
					or Schema Relation, or Sub-Query JOIN ON`)

			}
		}
		for (let i = 0; i < currentTree.childNodes.length; i++) {
			let childTreeNode = currentTree.childNodes[i]
			fromFragment += this.getFROMFragment(
				currentTree, childTreeNode, airDb, schemaUtils, metadataUtils)
		}

		return fromFragment
	}

	protected getGroupByFragment(
		groupBy?: JSONFieldInGroupBy[]
	): string {
		const validator = DI.db().getSync(Q_VALIDATOR)
		return groupBy.map(
			(groupByField) => {
				validator.validateAliasedFieldAccess(groupByField.fa)
				return `${groupByField.fa}`
			}).join(', ')
	}

	protected getOrderByFragment(orderBy: JSONFieldInOrderBy[]): string {
		const validator = DI.db().getSync(Q_VALIDATOR)
		return orderBy.map(
			(orderByField) => {
				validator.validateAliasedFieldAccess(orderByField.fa)
				switch (orderByField.so) {
					case SortOrder.ASCENDING:
						return `${orderByField.fa} ASC`
					case SortOrder.DESCENDING:
						return `${orderByField.fa} DESC`
				}
			}).join(', ')
	}

}
