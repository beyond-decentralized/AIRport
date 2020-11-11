import { IAirportDatabase, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache } from '@airport/air-control';
import { IContext } from '@airport/di';
import { CascadeOverwrite, DbEntity } from '@airport/ground-control';
import { ITransactionalServer } from './core/data/ITransactionalServer';
export interface IOperationContext<E, EntityCascadeGraph> extends IContext {
    cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph;
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    ioc: IIocOperationContext;
}
export interface IIocOperationContext {
    airDb: IAirportDatabase;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
export declare class IocOperationContext implements IIocOperationContext {
    static ensure(ctx: IOperationContext<any, any>): Promise<void>;
    airDb: IAirportDatabase;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    schemaUtils: ISchemaUtils;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
//# sourceMappingURL=OperationContext.d.ts.map