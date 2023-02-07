import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	IApplicationUtils,
	IEntityStateManager,
	InternalFragments,
	QueryFieldClause,
	QueryClauseObjectType,
	QuerySheet,
	QueryResultType,
	SQLDataType,
	Dictionary,
} from '@airport/ground-control'
import { IQueryUtils, IQueryRelationManager } from '@airport/tarmaq-query'
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
	extends NonEntitySQLQuery<QuerySheet> {

	selectClauseFragment: QueryFieldClause[]

	constructor(
		querySheet: QuerySheet,
		dialect: SQLDialect,
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
		super(querySheet,
			dialect, QueryResultType.SHEET,
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
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(
				this.query.SELECT, result, [0], internalFragments)
			parsedResults.push(parsedResult)
		})

		return parsedResults
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: QueryFieldClause[] | QueryFieldClause,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Flat Query`)
		}
		{
			let distinctClause = <QueryFieldClause>selectClauseFragment
			if (distinctClause.objectType == QueryClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.appliedFunctions[0].functionParameters[0], internalFragments,
					context)
				return `DISTINCT ${distinctSelect}`
			}
		}
		if (!(selectClauseFragment instanceof Array)) {
			throw new Error(`SELECT clause for a Flat Query must be an Array`)
		}

		this.selectClauseFragment = selectClauseFragment

		let fieldIndex = 0
		let selectSqlFragment = selectClauseFragment.map((field: QueryFieldClause) => {
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
		const resultsFromSelect: any[] = this.selectClauseFragment.map((field: QueryFieldClause) => {
			let propertyValue = this.sqlQueryAdapter.getResultCellValue(
				resultRow, field.fieldAlias, nextFieldIndex[0], field.dataType, null)
			nextFieldIndex[0]++

			return propertyValue
		})
		const selectClause = internalFragments.SELECT

		if (selectClause && selectClause.length) {
			for (const dbColumn of selectClause) {
				let propertyValue = this.sqlQueryAdapter.getResultCellValue(
					resultRow, dbColumn.name, nextFieldIndex[0],
					dbColumn.type as SQLDataType, null)
				resultsFromSelect.push(propertyValue)
				nextFieldIndex[0]++
			}
		}

		this.trackRepositoryIds(resultsFromSelect)

		return resultsFromSelect
	}

}
