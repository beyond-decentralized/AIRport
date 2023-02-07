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
	QueryField,
	QueryResultType,
	Dictionary
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
 * Created by Papa on 10/29/2016.
 */

export class FieldSQLQuery
	extends NonEntitySQLQuery<QueryField> {

	selectClauseField: QueryFieldClause

	constructor(
		queryField: QueryField,
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
		super(queryField,
			dialect, QueryResultType.FIELD,
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
		bridgedQueryConfiguration?: any,
	): Promise<any[]> {
		let parsedResults: any[] = []
		if (!results || !results.length) {
			return parsedResults
		}
		parsedResults = []
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(
				this.selectClauseField, result, [0])
			parsedResults.push(parsedResult)
		})

		return parsedResults
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: QueryFieldClause,
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Field Query`)
		}
		{
			let distinctClause = <QueryFieldClause>selectClauseFragment
			if (distinctClause.objectType == QueryClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.appliedFunctions[0].functionParameters[0],
					internalFragments, context)
				return `DISTINCT ${distinctSelect}`
			}
		}

		this.selectClauseField = <QueryFieldClause>selectClauseFragment
		let fieldIndex = 0
		let selectSqlFragment = this.getFieldSelectFragment(
			this.selectClauseField, ClauseType.NON_MAPPED_SELECT_CLAUSE,
			null, fieldIndex++, context)

		return selectSqlFragment
	}

	protected parseQueryResult(
		selectClauseFragment: QueryFieldClause,
		resultRow: any,
		nextFieldIndex: number[],
	): any {
		let columnValue = this.sqlQueryAdapter.getResultCellValue(
			resultRow, this.selectClauseField.fieldAlias,
			nextFieldIndex[0], this.selectClauseField.dataType,
			null)

		nextFieldIndex[0]++

		this.trackRepositoryIds([columnValue])

		return columnValue
	}

}
