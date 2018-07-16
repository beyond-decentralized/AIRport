"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const ExactOrderByParser_1 = require("../orderBy/ExactOrderByParser");
const SQLWhereBase_1 = require("./core/SQLWhereBase");
const NonEntitySQLQuery_1 = require("./NonEntitySQLQuery");
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
class SheetSQLQuery extends NonEntitySQLQuery_1.NonEntitySQLQuery {
    constructor(airportDb, utils, jsonQuery, dialect) {
        super(airportDb, utils, jsonQuery, dialect, ground_control_1.QueryResultType.SHEET);
        this.orderByParser = new ExactOrderByParser_1.ExactOrderByParser(this.validator);
    }
    getSELECTFragment(nested, selectClauseFragment) {
        if (!selectClauseFragment) {
            throw `SELECT clause is not defined for a Flat Query`;
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION) {
                let distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0]);
                return `DISTINCT ${distinctSelect}`;
            }
        }
        if (!(selectClauseFragment instanceof Array)) {
            throw `SELECT clause for a Flat Query must be an Array`;
        }
        let fieldIndex = 0;
        let selectSqlFragment = selectClauseFragment.map((field) => {
            return this.getFieldSelectFragment(field, SQLWhereBase_1.ClauseType.NON_MAPPED_SELECT_CLAUSE, null, fieldIndex++);
        }).join('');
        return selectSqlFragment;
    }
    parseQueryResults(results) {
        let parsedResults = [];
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
    parseQueryResult(selectClauseFragment, resultRow, nextFieldIndex) {
        return selectClauseFragment.map((field) => {
            let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null);
            nextFieldIndex[0]++;
            return propertyValue;
        });
    }
}
exports.SheetSQLQuery = SheetSQLQuery;
//# sourceMappingURL=SheetSQLQuery.js.map