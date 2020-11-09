import { IAirportDatabase, IFieldUtils, IQMetadataUtils, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache } from '@airport/air-control';
import { CascadeOverwrite, DbEntity } from '@airport/ground-control';
import { ITransactionalServer } from './core/data/ITransactionalServer';
export interface IBulkCreateContext<E, EntityCascadeGraph> extends IContext<E, EntityCascadeGraph> {
}
export interface IContext<E, EntityCascadeGraph> {
    cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph;
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    entities: E[];
    ioc: IIocContext;
}
export interface IIocContext {
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
export declare class IocContext implements IIocContext {
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
//# sourceMappingURL=Context.d.ts.map