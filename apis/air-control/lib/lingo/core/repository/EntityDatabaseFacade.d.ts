import { CascadeOverwrite, DbEntity } from '@airport/ground-control';
import { IEntityFind } from '../../query/api/EntityFind';
import { IEntityFindOne } from '../../query/api/EntityFindOne';
import { IEntitySearch } from '../../query/api/EntitySearch';
import { IEntitySearchOne } from '../../query/api/EntitySearchOne';
import { IDuo } from '../../query/Duo';
import { RawDelete } from '../../query/facade/Delete';
import { RawInsertColumnValues, RawInsertValues } from '../../query/facade/InsertValues';
import { RawUpdate, RawUpdateColumns } from '../../query/facade/Update';
import { MappedEntityArray } from '../../query/MappedEntityArray';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '../entity/Entity';
/**
 * Facade for all DB operations related to a particular Entity.
 */
export interface IEntityDatabaseFacade<Entity, EntitySelect extends IEntitySelectProperties, EntityCreateProperties extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity> {
    dbEntity: DbEntity;
    duo: IDuo<Entity, EntitySelect, EntityCreateProperties, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQ>;
    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    findOne: IEntityFindOne<Entity, EntitySelect>;
    /**
     * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
     */
    search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
    /**
     * The Observable based API for all Entity 'searchOne' queries.
     */
    searchOne: IEntitySearchOne<Entity, EntitySelect>;
    /**
     * Creates a new instance of the Query Entity for this entity type.
     */
    from: IQ;
    /**
     * Releases UpdateProperties Cache for entities that haven't been released
     * via an update call.
     *
     * @param {Entity} entities
     */
    /**
     * Creates the provided entity in the db.
     *
     * @return Number of records created (1 or 0)
     */
    create(entity: EntityCreateProperties, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    /**
     * Creates the provided entities in the db.
     *
     * @return Number of records created
     */
    bulkCreate(entities: EntityCreateProperties[], cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph, // defaults to false
    checkIfProcessed: boolean): Promise<number>;
    insertColumnValues<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number>;
    insertValues<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number>;
    insertColumnValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertColumnValues<IQE> | {
        (...args: any[]): RawInsertColumnValues<IQE>;
    }): Promise<number[] | string[] | number[][] | string[][]>;
    insertValuesGenerateIds<IQE extends IQEntity>(rawInsertValues: RawInsertValues<IQE> | {
        (...args: any[]): RawInsertValues<IQE>;
    }): Promise<number[] | string[] | number[][] | string[][]>;
    /**
     * Creates the provided entity in the db. As part of that attempts to
     * update only the changed fields.
     *
     * @return Number of records updated (1 or 0)
     */
    update(entity: EntityCreateProperties, // @Id fields must be populated
    cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    /**
     * Updates this entity type based on an UPDATE WHERE Query,
     * with a column based set clause.
     *
     * @return Number of records updated
     */
    updateColumnsWhere(rawUpdateColumns: RawUpdateColumns<EntityUpdateColumns, IQ> | {
        (...args: any[]): RawUpdateColumns<EntityUpdateColumns, IQ>;
    }): Promise<number>;
    /**
     * Updates this entity type based on an UPDATE WHERE Query (),
     * with a property based set clause.
     *
     * @return Number of records updated
     */
    updateWhere(rawUpdateProperties: RawUpdate<EntityUpdateProperties, IQ> | {
        (...args: any[]): RawUpdate<EntityUpdateProperties, IQ>;
    }): Promise<number>;
    /**
     * Deletes the provided entity in the db.
     *
     * @return Number of records deleted (1 or 0)
     */
    delete(entity: EntityId, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
    /**
     * Deletes this entity type based on an DELETE WHERE Query.
     *
     * @return Number of records deleted
     */
    deleteWhere(rawDelete: RawDelete<IQ> | {
        (...args: any[]): RawDelete<IQ>;
    }): Promise<number>;
    /**
     * Creates or Updates the provided entity in the db.  Uses the DB
     * UpdateProperties Context to determine if the entity needs to be updated.
     * If the entity isn't found in the update context, creates it.
     *
     * @return Number of records saved (1 or 0)
     */
    save(entity: EntityCreateProperties, cascadeGraph?: CascadeOverwrite | EntityCascadeGraph): Promise<number>;
}
