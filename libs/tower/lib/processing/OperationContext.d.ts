import { IAirportDatabase, IEntityStateManager, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, IRelationManager, ISchemaUtils, IUpdateCache } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DbEntity, IStoreDriver } from '@airport/ground-control';
import { ITransactionalServer } from '../core/data/ITransactionalServer';
export interface IOperationContext<E, EntityCascadeGraph> extends IContext {
    entityCascadeGraph: EntityCascadeGraph;
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    ioc: IIocOperationContext;
}
export interface IIocOperationContext {
    airDb: IAirportDatabase;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
export declare class IocOperationContext implements IIocOperationContext {
    airDb: IAirportDatabase;
    entityStateManager: IEntityStateManager;
    fieldUtils: IFieldUtils;
    metadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    schemaUtils: ISchemaUtils;
    storeDriver: IStoreDriver;
    transactionalServer: ITransactionalServer;
    updateCache: IUpdateCache;
    init(): Promise<void>;
}
export interface IOperationContextLoader {
    ensure(ctx: IOperationContext<any, any>): Promise<void>;
}
export declare class OperationContextLoader implements IOperationContextLoader {
    ensure(ctx: IOperationContext<any, any>): Promise<void>;
}
//# sourceMappingURL=OperationContext.d.ts.map