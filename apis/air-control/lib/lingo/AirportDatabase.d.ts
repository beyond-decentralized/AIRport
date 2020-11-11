import { DbSchema, DistributionStrategy, PlatformType } from '@airport/ground-control';
import { QEntityConstructor } from '../impl/core/entity/Entity';
import { QRelation } from '../impl/core/entity/Relation';
import { IEntityContext } from './core/data/EntityContext';
import { EntityConstructor, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from './core/entity/Entity';
import { FunctionsAndOperators } from './core/FunctionsAndOperators';
import { INonEntityFind } from './query/api/NonEntityFind';
import { INonEntityFindOne } from './query/api/NonEntityFindOne';
import { INonEntitySearch } from './query/api/NonEntitySearch';
import { INonEntitySearchOne } from './query/api/NonEntitySearchOne';
import { OperationName } from './query/Dao';
import { RawDelete } from './query/facade/Delete';
import { RawInsertColumnValues, RawInsertValues } from './query/facade/InsertValues';
import { RawUpdate, RawUpdateColumns } from './query/facade/Update';
export interface FunctionAndOperatorHub {
    functions: FunctionsAndOperators;
    F: FunctionsAndOperators;
}
export interface SchemaHub {
    schemas: DbSchema[];
    S: DbSchema[];
    qSchemas: QSchema[];
    Q: QSchema[];
    QM: {
        [name: string]: QSchema;
    };
}
export interface IAirportDatabase extends SchemaHub, FunctionAndOperatorHub {
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, ctx: IEntityContext): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    create<E>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    bulkCreate<E>(entities: E[], checkIfProcessed: boolean, // defaults to true
    ctx: IEntityContext, operationName?: OperationName, ensureGeneratedValues?: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    delete<E>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere<IQE extends IQEntity>(rawDelete: RawDelete<IQE> | {
        (...args: any[]): RawDelete<IQE>;
    }, ctx: IEntityContext): Promise<number>;
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save<E>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    update<E>(entity: E, ctx: IEntityContext, operationName?: OperationName): Promise<number>;
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(rawUpdateColumns: RawUpdateColumns<IEUC, IQE> | {
        (...args: any[]): RawUpdateColumns<IEUC, IQE>;
    }, ctx: IEntityContext): Promise<number>;
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
        (...args: any[]): RawUpdate<IEUP, IQE>;
    }, ctx: IEntityContext): Promise<number>;
}
export interface QSchema {
    domain: string;
    name: string;
    [name: string]: any;
}
export interface QSchemaInternal extends QSchema {
    __constructors__?: {
        [name: string]: EntityConstructor;
    };
    __qConstructors__?: {
        [name: string]: QEntityConstructor;
    };
    __qIdRelationConstructors__?: typeof QRelation[];
    __dbSchema__?: DbSchema;
}
//# sourceMappingURL=AirportDatabase.d.ts.map