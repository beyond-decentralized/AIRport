import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	IEntityStateManager,
	InternalFragments,
	JSONClauseField,
	JSONClauseObjectType,
	JsonTreeQuery,
	QueryResultType
} from '@airport/ground-control'
import { AliasCache, IApplicationUtils, IRelationManager } from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { MappedOrderByParser } from '../orderBy/MappedOrderByParser'
import { TreeQueryResultParser } from '../result/TreeQueryResultParser'
import { IValidator } from '../validation/Validator'
import { SQLDialect } from './core/SQLQuery'
import { ClauseType } from './core/SQLWhereBase'
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator'
import { NonEntitySQLQuery } from './NonEntitySQLQuery'
import { SqlFunctionField } from './SqlFunctionField'

/**
 * Created by Papa on 10/28/2016.
 */
export class TreeSQLQuery
	extends NonEntitySQLQuery<JsonTreeQuery> {

	protected queryParser: TreeQueryResultParser

	constructor(
		jsonQuery: JsonTreeQuery,
		dialect: SQLDialect,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		relationManager: IRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementQueryGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
	) {
		super(jsonQuery, dialect, QueryResultType.TREE,
			airportDatabase,
			applicationUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			relationManager,
			sqlQueryAdapter,
			storeDriver,
			subStatementQueryGenerator,
			utils,
			context)

		this.queryParser = new TreeQueryResultParser(
			applicationUtils, entityStateManager, utils)
		this.orderByParser = new MappedOrderByParser(qValidator)
	}

	/**
	 * Entities get merged if they are right next to each other in the result set.  If they
	 * are not, they are treated as separate entities - hence, your sort order matters.
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
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		results.forEach((result) => {
			let aliasCache = new AliasCache()
			let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0], aliasCache, aliasCache.getFollowingAlias())
			if (!lastResult) {
				parsedResults.push(parsedResult)
			} else if (lastResult !== parsedResult) {
				lastResult = parsedResult
				parsedResults.push(parsedResult)
			}
			this.queryParser.flushRow()
		})

		return parsedResults
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		const distinctClause = <JSONClauseField>selectClauseFragment
		if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
			if (nested) {
				throw new Error(
					`Cannot have DISTINCT specified in a nested SELECT clause`)
			}
			const distinctSelect = this.getSELECTFragment(
				nested, distinctClause.appliedFunctions[0].p[0], internalFragments, context)
			return `DISTINCT ${distinctSelect}`
		}

		let numProperties = 0
		for (let propertyName in selectClauseFragment) {
			if (propertyName === '*') {
				throw new Error(
					`'*' operator isn't yet implemented in mapped queries`)
			}
			if (propertyName === 'id') {
				throw new Error(
					`'id' operator isn't yet implemented in mapped queries`)
			}
			numProperties++
		}
		if (numProperties === 0) {
			if (nested) {
				throw new Error(
					`Mapped query must have fields in a nested-SELECT clause`)
			} else {
				return '*'
			}
		}

		let fieldIndex = 0

		let selectSqlFragment = ''
		for (let propertyName in selectClauseFragment) {
			const value = selectClauseFragment[propertyName]
			// Skip undefined values
			if (value === undefined) {
				continue
			}
			if (value instanceof SqlFunctionField) {
				selectSqlFragment += value.getValue(this, context)
				continue
			}
			selectSqlFragment += this.getFieldSelectFragment(
				value, ClauseType.MAPPED_SELECT_CLAUSE, () => {
					return this.getSELECTFragment(true, value, internalFragments, context)
				}, fieldIndex++, context)
		}

		return selectSqlFragment
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
		aliasCache: AliasCache,
		entityAlias: string
	): any {
		// Return blanks, primitives and Dates directly
		if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
			return resultRow
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				return this.parseQueryResult(distinctClause.appliedFunctions[0].p[0], resultRow, nextFieldIndex, aliasCache, entityAlias)
			}
		}

		let resultObject = this.queryParser.addEntity(entityAlias)

		for (let propertyName in selectClauseFragment) {
			if (selectClauseFragment[propertyName] === undefined) {
				continue
			}
			let jsonClauseField: JSONClauseField = selectClauseFragment[propertyName]
			let dataType = jsonClauseField.dt
			// Must be a sub-query
			if (!dataType) {
				let childResultObject = this.parseQueryResult(
					jsonClauseField,
					resultRow,
					nextFieldIndex,
					aliasCache,
					aliasCache.getFollowingAlias()
				)
				this.queryParser.bufferOneToManyCollection(entityAlias, resultObject, propertyName, childResultObject)
			} else {
				let propertyValue = this.sqlQueryAdapter.getResultCellValue(
					resultRow, jsonClauseField.fa, nextFieldIndex[0], dataType, null)
				this.queryParser.addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue)
			}
			nextFieldIndex[0]++
		}

		return this.queryParser.flushEntity(
			entityAlias,
			resultObject
		)
	}
}
