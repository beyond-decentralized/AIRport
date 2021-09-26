import { DI } from '@airport/di';
import { JSONClauseObjectType, QueryResultType } from '@airport/ground-control';
import { ExactOrderByParser } from '../orderBy/ExactOrderByParser';
import { Q_VALIDATOR, SQL_QUERY_ADAPTOR } from '../tokens';
import { ClauseType } from './core/SQLWhereBase';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/29/2016.
 */
export class FieldSQLQuery extends NonEntitySQLQuery {
    constructor(jsonQuery, dialect, context) {
        super(jsonQuery, dialect, QueryResultType.FIELD, context);
        const validator = DI.db()
            .getSync(Q_VALIDATOR);
        this.orderByParser = new ExactOrderByParser(validator);
    }
    async parseQueryResults(results, internalFragments, queryResultType, context, bridgedQueryConfiguration) {
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
    getSELECTFragment(nested, selectClauseFragment, internalFragments, context) {
        if (!selectClauseFragment) {
            throw new Error(`SELECT clause is not defined for a Field Query`);
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
                let distinctSelect = this.getSELECTFragment(nested, distinctClause.appliedFunctions[0].p[0], internalFragments, context);
                return `DISTINCT ${distinctSelect}`;
            }
        }
        let field = selectClauseFragment;
        let fieldIndex = 0;
        let selectSqlFragment = this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE, null, fieldIndex++, context);
        return selectSqlFragment;
    }
    parseQueryResult(selectClauseFragment, resultRow, nextFieldIndex) {
        const sqlAdaptor = DI.db()
            .getSync(SQL_QUERY_ADAPTOR);
        let field = selectClauseFragment;
        let propertyValue = sqlAdaptor.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null);
        nextFieldIndex[0]++;
        return propertyValue;
    }
}
//# sourceMappingURL=FieldSQLQuery.js.map