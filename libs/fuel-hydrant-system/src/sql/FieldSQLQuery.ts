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
	JsonFieldQuery,
	QueryResultType
} from '@airport/ground-control'
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../FuelHydrantContext'
import { ExactOrderByParser } from '../orderBy/ExactOrderByParser'
import { IValidator } from '../validation/Validator'
import { SQLDialect } from './core/SQLQuery'
import { ClauseType } from './core/SQLWhereBase'
import { ISubStatementSqlGenerator } from './core/SubStatementSqlGenerator'
import { NonEntitySQLQuery } from './NonEntitySQLQuery'

/**
 * Created by Papa on 10/29/2016.
 */

export class FieldSQLQuery
	extends NonEntitySQLQuery<JsonFieldQuery> {

	constructor(
		jsonQuery: JsonFieldQuery,
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
		super(jsonQuery, dialect, QueryResultType.FIELD,
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

		this.orderByParser = new ExactOrderByParser(qValidator)
	}

	async parseQueryResults(
		results: any[],
		internalFragments: InternalFragments,
		queryResultType: QueryResultType,
		context: IFuelHydrantContext,
		bridgedQueryConfiguration?: any,
	): Promise<any[]> {
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0])
			parsedResults.push(parsedResult)
		})

		return parsedResults
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Field Query`)
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.appliedFunctions[0].p[0], internalFragments, context)
				return `DISTINCT ${distinctSelect}`
			}
		}

		let field = <JSONClauseField>selectClauseFragment
		let fieldIndex = 0
		let selectSqlFragment = this.getFieldSelectFragment(
			field, ClauseType.NON_MAPPED_SELECT_CLAUSE,
			null, fieldIndex++, context)
		return selectSqlFragment
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
	): any {
		let field = <JSONClauseField>selectClauseFragment
		let propertyValue = this.sqlQueryAdapter.getResultCellValue(
			resultRow, field.fa, nextFieldIndex[0], field.dt, null)
		nextFieldIndex[0]++

		return propertyValue
	}

}
