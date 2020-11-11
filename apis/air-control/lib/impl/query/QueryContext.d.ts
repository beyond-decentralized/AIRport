import { IContext } from '@airport/di';
import { DbEntity, ITransactionalConnector } from '@airport/ground-control';
import { IAirportDatabase } from '../../lingo/AirportDatabase';
import { IUpdateCache } from '../../lingo/core/data/UpdateCache';
import { IQueryFacade } from '../../lingo/core/repository/DatabaseFacade';
import { IEntityUtils } from '../../lingo/utils/EntityUtils';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { ISchemaUtils } from '../../lingo/utils/SchemaUtils';
export interface IQueryContext<E> extends IContext {
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    ioc: IIocQueryContext;
}
export interface IIocQueryContext {
    airDb: IAirportDatabase;
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transactionalConnector: ITransactionalConnector;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
export declare class IocQueryContext implements IIocQueryContext {
    static ensure<E>(ctx: IQueryContext<E>): Promise<void>;
    airDb: IAirportDatabase;
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transactionalConnector: ITransactionalConnector;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
//# sourceMappingURL=QueryContext.d.ts.map