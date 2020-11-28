import {DI}                 from '@airport/di'
import {
	InternalFragments,
	JSONClauseField,
	JSONClauseObjectType,
	JsonFieldQuery,
	QueryResultType
}                           from '@airport/ground-control'
import {IOperationContext}  from '@airport/tower'
import {ExactOrderByParser} from '../orderBy/ExactOrderByParser'
import {
	Q_VALIDATOR,
	SQL_QUERY_ADAPTOR
}                           from '../tokens'
import {SQLDialect}         from './core/SQLQuery'
import {ClauseType}         from './core/SQLWhereBase'
import {NonEntitySQLQuery}  from './NonEntitySQLQuery'

/**
 * Created by Papa on 10/29/2016.
 */

export class FieldSQLQuery
	extends NonEntitySQLQuery<JsonFieldQuery> {

	constructor(
		jsonQuery: JsonFieldQuery,
		dialect: SQLDialect,
		context: IOperationContext<any, any>,
	) {
		super(jsonQuery, dialect, QueryResultType.FIELD, context)

		const validator = DI.db()
			.getSync(Q_VALIDATOR)

		this.orderByParser = new ExactOrderByParser(validator)
	}

	async parseQueryResults(
		results: any[],
		internalFragments: InternalFragments,
		queryResultType: QueryResultType,
		context: IOperationContext<any, any>,
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
		context: IOperationContext<any, any>,
	): string {
		if (!selectClauseFragment) {
			throw new Error(`SELECT clause is not defined for a Field Query`)
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(
					nested, distinctClause.af[0].p[0], internalFragments, context)
				return `DISTINCT ${distinctSelect}`
			}
		}

		let field             = <JSONClauseField>selectClauseFragment
		let fieldIndex        = 0
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
		const sqlAdaptor = DI.db()
			.getSync(SQL_QUERY_ADAPTOR)

		let field         = <JSONClauseField>selectClauseFragment
		let propertyValue = sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null)
		nextFieldIndex[0]++

		return propertyValue
	}

}
