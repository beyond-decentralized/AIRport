"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const MappedOrderByParser_1 = require("../orderBy/MappedOrderByParser");
const TreeQueryResultParser_1 = require("../result/TreeQueryResultParser");
const SQLWhereBase_1 = require("./core/SQLWhereBase");
const NonEntitySQLQuery_1 = require("./NonEntitySQLQuery");
const SqlFunctionField_1 = require("./SqlFunctionField");
/**
 * Created by Papa on 10/28/2016.
 */
class TreeSQLQuery extends NonEntitySQLQuery_1.NonEntitySQLQuery {
    constructor(jsonQuery, dialect) {
        super(jsonQuery, dialect, ground_control_1.QueryResultType.TREE);
        this.queryParser = new TreeQueryResultParser_1.TreeQueryResultParser();
        this.orderByParser = new MappedOrderByParser_1.MappedOrderByParser(this.validator);
    }
    getSELECTFragment(nested, selectClauseFragment, airDb, schemaUtils, metadataUtils) {
        const distinctClause = selectClauseFragment;
        if (distinctClause.ot == ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION) {
            if (nested) {
                throw new Error(`Cannot have DISTINCT specified in a nested select clause`);
            }
            const distinctSelect = this.getSELECTFragment(nested, distinctClause.af[0].p[0], airDb, schemaUtils, metadataUtils);
            return `DISTINCT ${distinctSelect}`;
        }
        let numProperties = 0;
        for (let propertyName in selectClauseFragment) {
            if (propertyName === '*') {
                throw new Error(`'*' operator isn't yet implemented in mapped queries`);
            }
            numProperties++;
        }
        if (numProperties === 0) {
            if (nested) {
                throw new Error(`Mapped query must have fields in a nested-select clause`);
            }
            else {
                return '*';
            }
        }
        let fieldIndex = 0;
        let selectSqlFragment = '';
        for (let propertyName in selectClauseFragment) {
            const value = selectClauseFragment[propertyName];
            // Skip undefined values
            if (value === undefined) {
                continue;
            }
            if (value instanceof SqlFunctionField_1.SqlFunctionField) {
                selectSqlFragment += value.getValue(this, airDb, schemaUtils, metadataUtils);
                continue;
            }
            selectSqlFragment += this.getFieldSelectFragment(value, SQLWhereBase_1.ClauseType.MAPPED_SELECT_CLAUSE, () => {
                return this.getSELECTFragment(true, value, airDb, schemaUtils, metadataUtils);
            }, fieldIndex++, airDb, schemaUtils, metadataUtils);
        }
        return selectSqlFragment;
    }
    /**
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(airDb, schemaUtils, results) {
        let parsedResults = [];
        if (!results || !results.length) {
            return parsedResults;
        }
        parsedResults = [];
        let lastResult;
        results.forEach((result) => {
            let aliasCache = new air_control_1.AliasCache();
            let parsedResult = this.parseQueryResult(this.jsonQuery.S, result, [0], aliasCache, aliasCache.getFollowingAlias());
            if (!lastResult) {
                parsedResults.push(parsedResult);
            }
            else if (lastResult !== parsedResult) {
                lastResult = parsedResult;
                parsedResults.push(parsedResult);
            }
            this.queryParser.flushRow();
        });
        return parsedResults;
    }
    parseQueryResult(selectClauseFragment, resultRow, nextFieldIndex, aliasCache, entityAlias) {
        // Return blanks, primitives and Dates directly
        if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
            return resultRow;
        }
        {
            let distinctClause = selectClauseFragment;
            if (distinctClause.ot == ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION) {
                return this.parseQueryResult(distinctClause.af[0].p[0], resultRow, nextFieldIndex, aliasCache, entityAlias);
            }
        }
        let resultObject = this.queryParser.addEntity(entityAlias);
        for (let propertyName in selectClauseFragment) {
            if (selectClauseFragment[propertyName] === undefined) {
                continue;
            }
            let jsonClauseField = selectClauseFragment[propertyName];
            let dataType = jsonClauseField.dt;
            // Must be a sub-query
            if (!dataType && dataType !== 0) {
                let childResultObject = this.parseQueryResult(jsonClauseField, resultRow, nextFieldIndex, aliasCache, aliasCache.getFollowingAlias());
                this.queryParser.bufferOneToManyCollection(entityAlias, resultObject, propertyName, childResultObject);
            }
            else {
                let propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, jsonClauseField.fa, nextFieldIndex[0], dataType, null);
                this.queryParser.addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue);
            }
            nextFieldIndex[0]++;
        }
        return this.queryParser.flushEntity(entityAlias, resultObject);
    }
}
exports.TreeSQLQuery = TreeSQLQuery;
//# sourceMappingURL=TreeSQLQuery.js.map