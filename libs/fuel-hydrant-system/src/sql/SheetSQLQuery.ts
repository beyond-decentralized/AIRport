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
	JsonSheetQuery,
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
 * Created by Papa on 10/16/2016.
 */

/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export class SheetSQLQuery
	extends NonEntitySQLQuery<JsonSheetQuery> {

	constructor(
		jsonQuery: JsonSheetQuery,
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
		super(jsonQuery, dialect, QueryResultType.SHEET,
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
		bridgedQueryConfiguration?: any
	): Promise<any[]> {
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		let lastResult
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(
				this.jsonQuery.S, result, [0], internalFragments)
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
			throw new Error(`SELECT clause is not defined for a Flat Query`)
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.appliedFunctions[0].p[0], internalFragments,
					context)
				return `DISTINCT ${distinctSelect}`
			}
		}
		if (!(selectClauseFragment instanceof Array)) {
			throw new Error(`SELECT clause for a Flat Query must be an Array`)
		}

		let fieldIndex = 0
		let selectSqlFragment = selectClauseFragment.map((field: JSONClauseField) => {
			return this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE,
				null, fieldIndex++, context)
		})
			.join('')

		const selectClause = internalFragments.SELECT
		if (selectClause && selectClause.length) {
			if (fieldIndex) {
				selectSqlFragment += '\n\t,'
			}
			selectSqlFragment += selectClause
				.map(dbColumn => `${dbColumn.name}`)
				.join('\n\t,')
		}

		return selectSqlFragment
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
		internalFragments: InternalFragments
	): any {
		const resultsFromSelect = selectClauseFragment.map((field: JSONClauseField) => {
			let propertyValue = this.sqlQueryAdapter.getResultCellValue(
				resultRow, field.fa, nextFieldIndex[0], field.dt, null)
			nextFieldIndex[0]++
			return propertyValue
		})
		const selectClause = internalFragments.SELECT

		if (selectClause && selectClause.length) {
			for (const dbColumn of selectClause) {
				let propertyValue = this.sqlQueryAdapter.getResultCellValue(
					resultRow, dbColumn.name, nextFieldIndex[0], dbColumn.type, null)
				resultsFromSelect.push(propertyValue)
				nextFieldIndex[0]++
			}
		}

		return resultsFromSelect
	}

}
