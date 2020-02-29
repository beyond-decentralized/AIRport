import { JSONClauseObjectType, QueryResultType } from '@airport/ground-control';
import { ExactOrderByParser } from '../orderBy/ExactOrderByParser';
import { ClauseType } from './core/SQLWhereBase';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export class FieldSQLQuery extends NonEntitySQLQuery {
    constructor(jsonQuery, dialect, storeDriver) {
        super(jsonQuery, dialect, QueryResultType.FIELD, storeDriver);
        this.orderByParser = new ExactOrderByParser(this.validator);
    }
    getSELECTFragment(nested, selectClauseFragment, internalFragments, airDb, schemaUtils, metadataUtils) {
        if (!selectClauseFragment) {
            throw new Error(`SELECT clause is not defined for a Field Query`);
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
                let distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0], internalFragments, airDb, schemaUtils, metadataUtils);
                return `DISTINCT ${distinctSelect}`;
            }
        }
        let field = selectClauseFragment;
        let fieldIndex = 0;
        let selectSqlFragment = this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE, null, fieldIndex++, airDb, schemaUtils, metadataUtils);
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
//# sourceMappingURL=FieldSQLQuery.js.map