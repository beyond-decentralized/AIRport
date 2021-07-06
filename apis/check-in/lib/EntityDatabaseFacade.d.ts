import { IDatabaseFacade, IDuo, IEntityCascadeGraph, IEntityContext, IEntityCreateProperties, IEntityDatabaseFacade, IEntityFind, IEntityFindOne, IEntityIdProperties, IEntitySearch, IEntitySearchOne, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, MappedEntityArray, QSchema, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate } from '@airport/air-control';
import { IOperationUniqueIdSequence } from '@airport/pressurization';
import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 12/11/2016.
 */
export declare class EntityDatabaseFacade<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity<Entity>> implements IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQ> {
    dbEntity: DbEntity;
    private Q;
    duo: IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQ>;
    find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    findOne: IEntityFindOne<Entity, EntitySelect>;
    search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    searchOne: IEntitySearchOne<Entity, EntitySelect>;
    constructor(dbEntity: DbEntity, Q: QSchema);
    get from(): IQ;
    insertColumnValues<IQE extends IQEntity<Entity>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity<Entity>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity<Entity>>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity<Entity>>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    updateColumnsWhere(rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateColumns, IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    updateWhere(rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateProperties, IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    deleteWhere(rawDelete: RawDelete<IQ> | {
        (...args: any[]): RawDelete<IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    save(entity: EntityCreate, ctx?: IEntityContext): Promise<number>;
    protected withDbEntity<R>(ctx: IEntityContext, callback: {
        (databaseFacade: IDatabaseFacade, ctx: IEntityContext): Promise<R>;
    }): Promise<R>;
    protected identifyObjects<T>(entity: T, ctx: IEntityContext, operationUniqueIdSeq?: IOperationUniqueIdSequence): void;
}
//# sourceMappingURL=EntityDatabaseFacade.d.ts.map