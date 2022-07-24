import { IContext } from '@airport/direction-indicator';
import { IEntityStateManager, ISaveResult, ITransactionalConnector, IUpdateCacheManager } from '@airport/ground-control';
import { IDatabaseFacade, IFunctionWrapper, IQueryFacade } from '@airport/tarmaq-dao';
import { IEntityContext } from '@airport/tarmaq-entity';
import { IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/tarmaq-query';
import { IEntityCopier } from '../core/data/EntityCopier';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class DatabaseFacade implements IDatabaseFacade {
    entityCopier: IEntityCopier;
    entityStateManager: IEntityStateManager;
    queryFacade: IQueryFacade;
    transactionalConnector: ITransactionalConnector;
    updateCacheManager: IUpdateCacheManager;
    name: string;
    addRepository(context?: IContext): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IContext): Promise<number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IContext): Promise<number[][] | string[][]>;
    deleteWhere<IQE extends IQEntity>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, context: IContext): Promise<number>;
    save<E>(entity: E, context: IEntityContext): Promise<ISaveResult>;
    saveToDestination<E>(repositoryDestination: string, entity: E, context: IEntityContext): Promise<ISaveResult>;
    private preSaveOperations;
    /**
     * Updates an entity with a WHERE clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(rawUpdate: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, context: IContext): Promise<number>;
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(rawUpdate: RawUpdate<IEUP, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, context: IContext): Promise<number>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
    private ensureQueryContext;
}
export declare class FunctionWrapper<QF extends Function> implements IFunctionWrapper<any> {
    constructor(queryFunction: QF);
    find(...params: any[]): any;
}
//# sourceMappingURL=DatabaseFacade.d.ts.map