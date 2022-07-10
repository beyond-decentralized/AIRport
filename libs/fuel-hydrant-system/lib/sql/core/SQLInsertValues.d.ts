import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, JsonInsertValues } from '@airport/ground-control';
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { IValidator } from '../../validation/Validator';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    constructor(jsonInsertValues: JsonInsertValues, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementSqlGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][], context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLInsertValues.d.ts.map