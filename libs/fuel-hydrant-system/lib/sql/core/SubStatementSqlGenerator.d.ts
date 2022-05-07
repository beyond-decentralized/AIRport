import { IAirportDatabase, IApplicationUtils, IQEntityInternal, IQMetadataUtils, IRelationManager, IUtils } from '@airport/air-traffic-control';
import { IEntityStateManager, JsonFieldQuery, JsonTreeQuery } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { IValidator } from '../../validation/Validator';
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
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    entityStateManager: IEntityStateManager;
    qMetadataUtils: IQMetadataUtils;
    qValidator: IValidator;
    relationManager: IRelationManager;
    sqlQueryAdapter: ISQLQueryAdaptor;
    storeDriver: IStoreDriver;
    utils: IUtils;
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