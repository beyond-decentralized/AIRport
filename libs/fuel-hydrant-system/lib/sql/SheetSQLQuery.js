import { JSONClauseObjectType, QueryResultType } from '@airport/ground-control';
import { ExactOrderByParser } from '../orderBy/ExactOrderByParser';
import { ClauseType } from './core/SQLWhereBase';
import { NonEntitySQLQuery } from './NonEntitySQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with flat (aka traditional) Select clause.
 */
export class SheetSQLQuery extends NonEntitySQLQuery {
    constructor(jsonQuery, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementQueryGenerator, utils, context) {
        super(jsonQuery, dialect, QueryResultType.SHEET, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementQueryGenerator, utils, context);
        this.orderByParser = new ExactOrderByParser(qValidator);
    }
    async parseQueryResults(results, internalFragments, queryResultType, context, bridgedQueryConfiguration) {
        let parsedResults = [];
        if (!results || !results.length) {
            return parsedResults;
        }
        parsedResults = [];
        let lastResult;
        results.forEach((result) => {
            let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0], internalFragments);
            parsedResults.push(parsedResult);
        });
        return parsedResults;
    }
    getSELECTFragment(nested, selectClauseFragment, internalFragments, context) {
        if (!selectClauseFragment) {
            throw new Error(`SELECT clause is not defined for a Flat Query`);
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == JSONClauseObjectType.DISTINCT_FUNCTION) {
                let distinctSelect = this.getSELECTFragment(nested, distinctClause.appliedFunctions[0].p[0], internalFragments, context);
                return `DISTINCT ${distinctSelect}`;
            }
        }
        if (!(selectClauseFragment instanceof Array)) {
            throw new Error(`SELECT clause for a Flat Query must be an Array`);
        }
        let fieldIndex = 0;
        let selectSqlFragment = selectClauseFragment.map((field) => {
            return this.getFieldSelectFragment(field, ClauseType.NON_MAPPED_SELECT_CLAUSE, null, fieldIndex++, context);
        })
            .join('');
        const selectClause = internalFragments.SELECT;
        if (selectClause && selectClause.length) {
            if (fieldIndex) {
                selectSqlFragment += '\n\t,';
            }
            selectSqlFragment += selectClause
                .map(dbColumn => `${dbColumn.name}`)
                .join('\n\t,');
        }
        return selectSqlFragment;
    }
    parseQueryResult(selectClauseFragment, resultRow, nextFieldIndex, internalFragments) {
        const resultsFromSelect = selectClauseFragment.map((field) => {
            let propertyValue = this.sqlQueryAdapter.getResultCellValue(resultRow, field.fa, nextFieldIndex[0], field.dt, null);
            nextFieldIndex[0]++;
            return propertyValue;
        });
        const selectClause = internalFragments.SELECT;
        if (selectClause && selectClause.length) {
            for (const dbColumn of selectClause) {
                let propertyValue = this.sqlQueryAdapter.getResultCellValue(resultRow, dbColumn.name, nextFieldIndex[0], dbColumn.type, null);
                resultsFromSelect.push(propertyValue);
                nextFieldIndex[0]++;
            }
        }
        return resultsFromSelect;
    }
}
//# sourceMappingURL=SheetSQLQuery.js.map