import {
	IAirportDatabase,
	IQMetadataUtils,
	ISchemaUtils
}                           from '@airport/air-control'
import {
	JSONClauseField,
	JSONClauseObjectType,
	JsonSheetQuery,
	QueryResultType
}                           from '@airport/ground-control'
import {ExactOrderByParser} from '../orderBy/ExactOrderByParser'
import {SQLDialect}         from './core/SQLQuery'
import {ClauseType}         from './core/SQLWhereBase'
import {NonEntitySQLQuery}  from './NonEntitySQLQuery'

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
		dialect: SQLDialect
	) {
		super(jsonQuery, dialect, QueryResultType.SHEET)
		this.orderByParser = new ExactOrderByParser(this.validator)
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Flat Query`)
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.af[0].p[0],
					airDb, schemaUtils, metadataUtils)
				return `DISTINCT ${distinctSelect}`
			}
		}
		if (!(selectClauseFragment instanceof Array)) {
			throw new Error(`SELECT clause for a Flat Query must be an Array`)
		}

		let fieldIndex        = 0
		let selectSqlFragment = selectClauseFragment.map((field: JSONClauseField) => {
			return this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE,
				null, fieldIndex++, airDb, schemaUtils, metadataUtils)
		}).join('')


		return selectSqlFragment
	}

	parseQueryResults(
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		results: any[]
	): any[] {
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

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
	): any {
		return selectClauseFragment.map((field: JSONClauseField) => {
			let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null)
			nextFieldIndex[0]++
			return propertyValue
		})
	}

}
