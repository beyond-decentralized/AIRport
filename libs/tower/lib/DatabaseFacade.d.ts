import { IAirportDatabase, IDatabaseFacade, IEntityUpdateColumns, IEntityUpdateProperties, IFieldUtils, IFunctionWrapper, IQEntity, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache, MappedEntityArray, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns, UpdateRecord } from '@airport/air-control';
import { CascadeOverwrite, DbEntity, ITransactionalConnector } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { OperationManager } from './OperationManager';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class DatabaseFacade extends OperationManager implements IDatabaseFacade {
    name: string;
    addRepository(name: string, url?: string, platform?: PlatformType, platformConfig?: string, distributionStrategy?: DistributionStrategy): Promise<number>;
    create<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    bulkCreate<E>(dbEntity: DbEntity, entities: E[], checkIfProcessed?: boolean, cascadeOverwrite?: CascadeOverwrite): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number>;
    insertValues<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number[] | string[]>;
    insertValuesGenerateIds<IQE extends IQEntity>(dbEntity: DbEntity, rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number[] | string[]>;
    delete<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    deleteWhere<IQE extends IQEntity>(dbEntity: DbEntity, rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }): Promise<number>;
    save<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    update<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(dbEntity: DbEntity, rawUpdate: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }): Promise<number>;
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(dbEntity: DbEntity, rawUpdate: RawUpdate<IEUP, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }): Promise<number>;
    private ensureId;
    getOriginalRecord(dbEntity: DbEntity, entity: any, updateCache: IUpdateCache): Promise<any>;
    getOriginalValues(entitiesToUpdate: UpdateRecord[], dbEntity: DbEntity, airDb: IAirportDatabase, fieldUtils: IFieldUtils, queryFacade: IQueryFacade, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache): Promise<MappedEntityArray<any>>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
}
export declare class FunctionWrapper<QF extends Function> implements IFunctionWrapper<any> {
    constructor(queryFunction: QF);
    find(...params: any[]): any;
}
