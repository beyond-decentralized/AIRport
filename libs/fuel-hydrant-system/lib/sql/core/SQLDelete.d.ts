import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { IEntityStateManager, JsonDelete } from '@airport/ground-control';
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { IValidator } from '../../validation/Validator';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(jsonDelete: JsonDelete, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementSqlGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLDelete.d.ts.map