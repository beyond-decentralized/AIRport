import { DbEntity, ISaveResult } from '@airport/ground-control';
import { RawDelete } from '../query/facade/Delete';
import { RawInsertColumnValues, RawInsertValues } from '../query/facade/InsertValues';
import { RawUpdate, RawUpdateColumns } from '../query/facade/Update';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from './entity/Entity';
import { IEntityContext } from './EntityContext';
/**
 * Facade for all DB operations related to a particular Entity.
 */
export interface IEntityQueryDatabaseFacade<IEntity, EntitySelect extends IEntitySelectProperties, EntityCreateProperties extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity> {
    dbEntity: DbEntity;
    /**
     * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
     */
    /**
     * The Observable based API for all Entity 'searchOne' queries.
     */
    /**
     * Creates a new instance of the Query Entity for this entity type.
     */
    from: IQ;
    insertColumnValues<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx?: IEntityContext): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }, ctx?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }, ctx?: IEntityContext): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Updates this entity type based on an UPDATE WHERE Query,
     * with a column based set clause.
     *
     * @return Number of records updated
     */
    updateColumnsWhere(rawUpdateColumns: RawUpdateColumns<EntityUpdateColumns, IQ> | {
        (...args: any[]): RawUpdateColumns<EntityUpdateColumns, IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    /**
     * Updates this entity type based on an UPDATE WHERE Query (),
     * with a property based set clause.
     *
     * @return Number of records updated
     */
    updateWhere(rawUpdateProperties: RawUpdate<EntityUpdateProperties, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateProperties, IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    /**
     * Deletes this entity type based on an DELETE WHERE Query.
     *
     * @return Number of records deleted
     */
    deleteWhere(rawDelete: RawDelete<IQ> | {
        (...args: any[]): RawDelete<IQ>;
    }, ctx?: IEntityContext): Promise<number>;
    /**
     * Creates or Updates the provided entity in the db.  Uses the DB
     * UpdateProperties Context to determine if the entity needs to be updated.
     * If the entity isn't found in the update context, creates it.
     *
     * @return ISaveResult object with metadata on saved objects
     */
    save(entity: EntityCreateProperties, ctx?: IEntityContext): Promise<ISaveResult>;
    /**
     * @return ISaveResult object with metadata on saved objects
     */
    saveToDestination(repositoryDestination: string, entity: EntityCreateProperties, ctx?: IEntityContext): Promise<ISaveResult>;
}
//# sourceMappingURL=IEntityQueryDatabaseFacade.d.ts.map