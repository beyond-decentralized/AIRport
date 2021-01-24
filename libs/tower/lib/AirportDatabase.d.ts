import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, IEntityAccumulator, IEntityContext, IEntityRecord, IEntityUpdateColumns, IEntityUpdateProperties, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, IQEntity, OperationName, QSchema, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate, RawUpdateColumns } from '@airport/air-control';
import { DbSchema, DistributionStrategy, PlatformType } from '@airport/ground-control';
export declare class AirportDatabase implements IAirportDatabase {
    db: IDatabaseFacade;
    entityMap: Map<any, IEntityRecord>;
    F: FunctionsAndOperators;
    functions: FunctionsAndOperators;
    S: DbSchema[];
    schemas: DbSchema[];
    qSchemas: QSchema[];
    Q: QSchema[];
    QM: {
        [name: string]: QSchema;
    };
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
    constructor();
    getAccumulator(schemaDomain: string, schemaName: string): IEntityAccumulator;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context?: IEntityContext): Promise<number>;
    insertColumnValues<IQE extends IQEntity<any>>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context?: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context?: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, context?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity<any>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, context?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere<IQE extends IQEntity<any>>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, context?: IEntityContext): Promise<number>;
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save<E>(entity: E, context?: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(rawUpdateColumns: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, context?: IEntityContext): Promise<number>;
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity<any>>(rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, context?: IEntityContext): Promise<number>;
}
export declare function injectAirportDatabase(): void;
//# sourceMappingURL=AirportDatabase.d.ts.map