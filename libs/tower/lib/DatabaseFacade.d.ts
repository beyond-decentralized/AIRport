import { IDatabaseFacade, IEntityUpdateColumns, IEntityUpdateProperties, IFunctionWrapper, IQEntity, IUpdateCache, OperationName, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { IOperationContext } from './processing/OperationContext';
import { OperationManager } from './processing/OperationManager';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class DatabaseFacade extends OperationManager implements IDatabaseFacade {
    name: string;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IOperationContext<any, any>): Promise<number>;
    insertColumnValues<IQE extends IQEntity<any>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IOperationContext<any, any>): Promise<number>;
    insertValues<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IOperationContext<any, any>): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IOperationContext<any, any>): Promise<number[] | string[] | number[][] | string[][]>;
    deleteWhere<IQE extends IQEntity<any>>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, context: IOperationContext<any, any>): Promise<number>;
    save<E, EntityCascadeGraph>(entity: E, context: IOperationContext<any, any>, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(rawUpdate: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, context: IOperationContext<any, any>): Promise<number>;
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity<any>>(rawUpdate: RawUpdate<IEUP, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, context: IOperationContext<any, any>): Promise<number>;
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