import {
	JSONClauseField,
	JSONClauseObjectType,
	JsonSheetQuery,
	QueryResultType
}                                        from "@airport/ground-control";
import { ExactOrderByParser }            from "../orderBy/ExactOrderByParser";
import { SQLDialect }                    from "./core/SQLQuery";
import { ClauseType }                    from "./core/SQLWhereBase";
import { NonEntitySQLQuery }             from "./NonEntitySQLQuery";
import {IAirportDatabase, IUtils, Utils} from "@airport/air-control";

/**
 * Created by Papa on 10/16/2016.
 */

/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export class SheetSQLQuery extends NonEntitySQLQuery<JsonSheetQuery> {

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		jsonQuery: JsonSheetQuery,
		dialect: SQLDialect
	) {
		super(airportDb, utils, jsonQuery, dialect, QueryResultType.SHEET);
		this.orderByParser = new ExactOrderByParser(this.validator);
	}

	protected getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any
	): string {
		if (!selectClauseFragment) {
			throw `SELECT clause is not defined for a Flat Query`;
		}
		{
			let distinctClause = <JSONClauseField>selectClauseFragment;
			if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
				let distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0]);
				return `DISTINCT ${distinctSelect}`;
			}
		}
		if (!(selectClauseFragment instanceof Array)) {
			throw `SELECT clause for a Flat Query must be an Array`;
		}

		let fieldIndex = 0;
		let selectSqlFragment = selectClauseFragment.map((field: JSONClauseField) => {
			return this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE,
				null, fieldIndex++);
		}).join('');


		return selectSqlFragment;
	}

	parseQueryResults(
		results: any[]
	): any[] {
		let parsedResults: any[] = [];
		if (!results || !results.length) {
			return parsedResults;
		}
		parsedResults = [];
		let lastResult;
		results.forEach((result) => {
			let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0]);
			parsedResults.push(parsedResult);
		});

		return parsedResults;
	}

	protected parseQueryResult(
		selectClauseFragment: any,
		resultRow: any,
		nextFieldIndex: number[],
	): any {
		return selectClauseFragment.map((field: JSONClauseField) => {
			let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null);
			nextFieldIndex[0]++;
			return propertyValue;
		});
	}

}