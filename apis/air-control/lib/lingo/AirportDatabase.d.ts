import { DbApplication, ISaveResult } from '@airport/ground-control';
import { QEntityConstructor } from '../impl/core/entity/Entity';
import { QRelation } from '../impl/core/entity/Relation';
import { IEntityContext } from './core/EntityContext';
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
export interface IEntityAccumulator {
    add(clazz: any, index: number): void;
}
export interface IEntityRecord {
    entity: {
        index: number;
        name: string;
    };
    application: {
        domain: string;
        name: string;
    };
}
export interface ApplicationHub {
    entityMap: Map<any, IEntityRecord>;
    applications: DbApplication[];
    S: DbApplication[];
    qApplications: QApplication[];
    Q: QApplication[];
    QM: {
        [name: string]: QApplication;
    };
}
export interface IAirportDatabase extends ApplicationHub, FunctionAndOperatorHub {
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
    getAccumulator(applicationDomain: string, applicationName: string): IEntityAccumulator;
    addRepository(context?: IEntityContext): Promise<number>;
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
    save<E>(entity: E, context?: IEntityContext, operationName?: OperationName): Promise<ISaveResult>;
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
export interface QApplication {
    domain: string;
    name: string;
    [name: string]: any;
}
export interface QApplicationInternal extends QApplication {
    __constructors__?: {
        [name: string]: EntityConstructor;
    };
    __qConstructors__?: {
        [name: string]: QEntityConstructor<EntityConstructor>;
    };
    __qIdRelationConstructors__?: typeof QRelation[];
    __dbApplication__?: DbApplication;
}
//# sourceMappingURL=AirportDatabase.d.ts.map