import { FieldSQLQuery } from '../FieldSQLQuery';
import { TreeSQLQuery } from '../TreeSQLQuery';
export class SubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery, dialect, context) {
        let mappedSqlQuery = new TreeSQLQuery(jsonTreeQuery, dialect, context);
        const subQuerySql = mappedSqlQuery.toSQL({}, context);
        const parameterReferences = mappedSqlQuery.parameterReferences;
        return {
            parameterReferences,
            subQuerySql
        };
    }
    getFieldQuerySql(jsonFieldSqlSubQuery, dialect, qEntityMapByAlias, context) {
        let fieldSqlQuery = new FieldSQLQuery(jsonFieldSqlSubQuery, dialect, context);
        fieldSqlQuery.addQEntityMapByAlias(qEntityMapByAlias);
        const subQuerySql = fieldSqlQuery.toSQL({}, context);
        const parameterReferences = fieldSqlQuery.parameterReferences;
        return {
            parameterReferences,
            subQuerySql
        };
    }
}
//# sourceMappingURL=SubStatementSqlGenerator.js.map