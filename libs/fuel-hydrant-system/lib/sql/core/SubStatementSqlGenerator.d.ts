import { IQEntityInternal } from '@airport/air-control';
import { JsonFieldQuery, JsonTreeQuery } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLDialect } from './SQLQuery';
export interface ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IFuelHydrantContext): {
        parameterReferences: (number | string)[];
        subQuerySql: string;
    };
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }, context: IFuelHydrantContext): {
        parameterReferences: (number | string)[];
        subQuerySql: string;
    };
}
export declare class SubStatementSqlGenerator implements ISubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery: JsonTreeQuery, dialect: SQLDialect, context: IFuelHydrantContext): {
        parameterReferences: (number | string)[];
        subQuerySql: string;
    };
    getFieldQuerySql(jsonFieldSqlSubQuery: JsonFieldQuery, dialect: SQLDialect, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }, context: IFuelHydrantContext): {
        parameterReferences: (number | string)[];
        subQuerySql: string;
    };
}
//# sourceMappingURL=SubStatementSqlGenerator.d.ts.map