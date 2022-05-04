import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, JSONEntityRelation } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLDialect } from './SQLQuery';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export declare abstract class SQLNoJoinQuery extends SQLWhereBase {
    protected relationManager: IRelationManager;
    constructor(dbEntity: DbEntity, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, context: IFuelHydrantContext);
    protected getTableFragment(fromRelation: JSONEntityRelation, context: IFuelHydrantContext, addAs?: boolean): string;
}
//# sourceMappingURL=SQLNoJoinQuery.d.ts.map