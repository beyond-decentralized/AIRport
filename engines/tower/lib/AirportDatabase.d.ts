import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, IDatabaseState, IEntityAccumulator, IEntityContext, IEntityRecord, IEntityUpdateColumns, IEntityUpdateProperties, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, IQEntity, OperationName, QApplication, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/air-traffic-control';
import { DbApplication, ISaveResult } from '@airport/ground-control';
export declare class AirportDatabase implements IAirportDatabase {
    databaseFacade: IDatabaseFacade;
    databaseStore: IDatabaseState;
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
    get entityMap(): Map<any, IEntityRecord>;
    get F(): FunctionsAndOperators;
    get functions(): FunctionsAndOperators;
    get A(): DbApplication[];
    get applications(): DbApplication[];
    get qApplications(): QApplication[];
    get Q(): QApplication[];
    get QM(): {
        [name: string]: QApplication;
    };
    load(): Promise<any>;
    getAccumulator(applicationDomain: string, applicationName: string): IEntityAccumulator;
    addRepository(context?: IEntityContext): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context?: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context?: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere<IQE extends IQEntity>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, context?: IEntityContext): Promise<number>;
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save<E>(entity: E, context?: IEntityContext, operationName?: OperationName): Promise<ISaveResult>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(rawUpdateColumns: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, context?: IEntityContext): Promise<number>;
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, context?: IEntityContext): Promise<number>;
}
export declare function injectAirportDatabase(): void;
//# sourceMappingURL=AirportDatabase.d.ts.map