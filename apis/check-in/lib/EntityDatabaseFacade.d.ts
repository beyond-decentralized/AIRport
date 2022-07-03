import { IDao, IDatabaseFacade, IDuo, IEntityCascadeGraph, IEntityContext, IEntityCreateProperties, IEntityDatabaseFacade, IEntityFind, IEntityFindOne, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, RawDelete, RawInsertColumnValues, RawInsertValues, RawUpdate } from '@airport/air-traffic-control';
import { QApplication } from '@airport/aviation-communication';
import { DbEntity, ISaveResult } from '@airport/ground-control';
/**
 * Created by Papa on 12/11/2016.
 */
export declare class EntityDatabaseFacade<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity> implements IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQ> {
    dbEntity: DbEntity;
    private Q;
    protected dao: IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQ>;
    duo: IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQ>;
    find: IEntityFind<Entity, Array<Entity>, EntitySelect>;
    findOne: IEntityFindOne<Entity, EntitySelect>;
    constructor(dbEntity: DbEntity, Q: QApplication, dao: IDao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQ>);
    get from(): IQ;
    insertColumnValues<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertColumnValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
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
    save(entity: EntityCreate, ctx?: IEntityContext): Promise<ISaveResult>;
    /**
     * @return ISaveResult object with metadata on saved objects
     */
    saveToDestination(repositoryDestination: string, entity: EntityCreate, ctx?: IEntityContext): Promise<ISaveResult>;
    protected withDbEntity<R>(ctx: IEntityContext, callback: {
        (databaseFacade: IDatabaseFacade, ctx: IEntityContext): Promise<R>;
    }): Promise<R>;
}
//# sourceMappingURL=EntityDatabaseFacade.d.ts.map