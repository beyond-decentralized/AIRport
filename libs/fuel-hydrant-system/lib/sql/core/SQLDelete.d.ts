import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager } from '@airport/air-control';
import { IEntityStateManager, JsonDelete } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(jsonDelete: JsonDelete, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLDelete.d.ts.map