import { IDatabaseFacade, IEntityContext, IEntityUpdateColumns, IEntityUpdateProperties, IFunctionWrapper, IQEntity, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/air-control';
import { IContext } from '@airport/di';
import { ISaveResult } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class DatabaseFacade implements IDatabaseFacade {
    name: string;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IContext): Promise<number>;
    insertColumnValues<IQE extends IQEntity<any>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IContext): Promise<number>;
    insertValues<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context: IContext): Promise<number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context: IContext): Promise<number[][] | string[][]>;
    deleteWhere<IQE extends IQEntity<any>>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, context: IContext): Promise<number>;
    save<E>(entity: E, context: IEntityContext): Promise<ISaveResult>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(rawUpdate: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, context: IContext): Promise<number>;
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity<any>>(rawUpdate: RawUpdate<IEUP, IQE> | {
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