import { IQEntityInternal } from '@airport/air-control';
import { JsonFieldQuery, JsonTreeQuery } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLDialect } from './SQLQuery';
export interface ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IOperationContext<any, any>): string;
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    }, context: IOperationContext<any, any>): string;
}
export declare class SubStatementSqlGenerator implements ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IOperationContext<any, any>): string;
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    }, context: IOperationContext<any, any>): string;
}
//# sourceMappingURL=SubStatementSqlGenerator.d.ts.map