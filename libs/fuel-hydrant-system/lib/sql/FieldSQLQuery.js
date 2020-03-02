"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const ExactOrderByParser_1 = require("../orderBy/ExactOrderByParser");
const SQLWhereBase_1 = require("./core/SQLWhereBase");
const NonEntitySQLQuery_1 = require("./NonEntitySQLQuery");
/**
 * Created by Papa on 10/29/2016.
 */
class FieldSQLQuery extends NonEntitySQLQuery_1.NonEntitySQLQuery {
    constructor(jsonQuery, dialect, storeDriver) {
        super(jsonQuery, dialect, ground_control_1.QueryResultType.FIELD, storeDriver);
        this.orderByParser = new ExactOrderByParser_1.ExactOrderByParser(this.validator);
    }
    getSELECTFragment(nested, selectClauseFragment, internalFragments, airDb, schemaUtils, metadataUtils) {
        if (!selectClauseFragment) {
            throw new Error(`SELECT clause is not defined for a Field Query`);
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION) {
                let distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0], internalFragments, airDb, schemaUtils, metadataUtils);
                return `DISTINCT ${distinctSelect}`;
            }
        }
        let field = selectClauseFragment;
        let fieldIndex = 0;
        let selectSqlFragment = this.getFieldSelectFragment(field, SQLWhereBase_1.ClauseType.NON_MAPPED_SELECT_CLAUSE, null, fieldIndex++, airDb, schemaUtils, metadataUtils);
        return selectSqlFragment;
    }
    parseQueryResults(airDb, schemaUtils, results) {
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
        let field = selectClauseFragment;
        let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null);
        nextFieldIndex[0]++;
        return propertyValue;
    }
}
exports.FieldSQLQuery = FieldSQLQuery;
//# sourceMappingURL=FieldSQLQuery.js.map