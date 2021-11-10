import { IAbstractQueryContext, ITransactionalConnector } from '@airport/ground-control';
import { IAirportDatabase } from '../AirportDatabase';
import { IQueryFacade } from '../core/repository/DatabaseFacade';
import { IEntityUtils } from '../utils/EntityUtils';
import { IFieldUtils } from '../utils/FieldUtils';
import { IQueryUtils } from '../utils/QueryUtils';
import { ISchemaUtils } from '../utils/SchemaUtils';
export interface IQueryContext extends IAbstractQueryContext<IIocQueryContext> {
}
export interface IIocQueryContext {
    airDb: IAirportDatabase;
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transactionalConnector: ITransactionalConnector;
    init(): Promise<void>;
}
//# sourceMappingURL=QueryContext.d.ts.map