import { IDatabaseFacade, IEntityUpdateColumns, IEntityUpdateProperties, IFunctionWrapper, IQEntity, IQOrderableField, ITreeEntity, MappedEntityArray, NonEntityFind, NonEntityFindOne, NonEntitySearch, NonEntitySearchOne, RawDelete, RawFieldQuery, RawInsertColumnValues, RawInsertValues, RawSheetQuery, RawTreeQuery, RawUpdate, RawUpdateColumns, UpdateCacheType, UpdateRecord } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { OperationManager } from './OperationManager';
/**
 * Created by Papa on 5/23/2016.
 */
export declare class EntityManager extends OperationManager implements IDatabaseFacade {
    name: string;
    find: NonEntityFind;
    findOne: NonEntityFindOne;
    search: NonEntitySearch;
    searchOne: NonEntitySearchOne;
    findAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<Array<any>>;
    findAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): Promise<Array<any[]>>;
    findAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<Array<ITE>>;
    findOneAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any>;
    findOneAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): Promise<any[]>;
    findOneAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<ITE>;
    searchAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<Array<any>>;
    searchAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): IObservable<Array<any[]>>;
    searchAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<Array<ITE>>;
    searchOneAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any>;
    searchOneAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): IObservable<any[]>;
    searchOneAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE>;
    releaseCachedForUpdate(cacheForUpdate: UpdateCacheType, dbEntity: DbEntity, ...entities: any[]): void;
    dropUpdateCache(): void;
    addRepository(name: string, url?: string, platform?: PlatformType, platformConfig?: string, distributionStrategy?: DistributionStrategy): Promise<number>;
    create<E>(dbEntity: DbEntity, entity: E): Promise<number>;
    bulkCreate<E>(dbEntity: DbEntity, entities: E[], checkIfProcessed?: boolean, cascade?: boolean): Promise<number>;
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
    getOriginalRecord(dbEntity: DbEntity, idKey: string): Promise<any>;
    getOriginalValues(entitiesToUpdate: UpdateRecord[], dbEntity: DbEntity): Promise<MappedEntityArray<any>>;
    prepare<QF extends Function>(queryFunction: QF): IFunctionWrapper<QF>;
}
export declare class FunctionWrapper<QF extends Function> implements IFunctionWrapper<any> {
    constructor(queryFunction: QF);
    find(...params: any[]): any;
}
