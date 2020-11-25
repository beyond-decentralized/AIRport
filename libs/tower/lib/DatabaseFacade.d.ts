import { IDatabaseFacade, IEntityUpdateColumns, IEntityUpdateProperties, IFunctionWrapper, IQEntity, IUpdateCache, OperationName, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/air-control';
import { CascadeOverwrite, DbEntity } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { IOperationContext } from './OperationContext';
import { OperationManager } from './OperationManager';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class DatabaseFacade extends OperationManager implements IDatabaseFacade {
    name: string;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, ctx: IOperationContext<any, any>): Promise<number>;
    create<E, EntityCascadeGraph>(entity: E, ctx: IOperationContext<E, EntityCascadeGraph>, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    bulkCreate<E, EntityCascadeGraph>(entities: E[], ctx: IOperationContext<E, EntityCascadeGraph>, checkIfProcessed?: boolean, operationName?: OperationName, ensureGeneratedValues?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    delete<E>(entity: E, ctx: IOperationContext<any, any>): Promise<number>;
    deleteWhere<IQE extends IQEntity>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number>;
    save<E, EntityCascadeGraph>(entity: E, ctx: IOperationContext<any, any>, operationName?: OperationName): Promise<number>;
    update<E, EntityCascadeGraph>(entity: E, ctx: IOperationContext<E, EntityCascadeGraph>, cascadeGraph?: EntityCascadeGraph): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(rawUpdate: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number>;
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(rawUpdate: RawUpdate<IEUP, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, ctx: IOperationContext<any, any>): Promise<number>;
    getOriginalRecord<T>(dbEntity: DbEntity, entity: T, updateCache: IUpdateCache): Promise<any>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
    private ensureId;
    private ensureIocContext;
}
export declare class FunctionWrapper<QF extends Function> implements IFunctionWrapper<any> {
    constructor(queryFunction: QF);
    find(...params: any[]): any;
}
//# sourceMappingURL=DatabaseFacade.d.ts.map