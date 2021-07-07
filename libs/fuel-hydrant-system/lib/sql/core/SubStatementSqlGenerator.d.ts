import { IQEntityInternal } from '@airport/air-control';
import { JsonFieldQuery, JsonTreeQuery } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLDialect } from './SQLQuery';
export interface ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IFuelHydrantContext): string;
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    }, context: IFuelHydrantContext): string;
}
export declare class SubStatementSqlGenerator implements ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IFuelHydrantContext): string;
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    }, context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SubStatementSqlGenerator.d.ts.map