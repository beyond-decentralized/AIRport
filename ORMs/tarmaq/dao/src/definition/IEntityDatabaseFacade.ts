import { IEntityFind } from './query/IEntityFind'
import { IEntityFindOne } from './query/IEntityFindOne'
import {
    IEntityCascadeGraph,
    IEntityCreateProperties,
    IEntityIdProperties,
    IEntityQueryDatabaseFacade,
    IEntitySelectProperties,
    IEntityUpdateColumns,
    IEntityUpdateProperties,
    IQEntity
} from '@airport/tarmaq-query';
import { IEntitySearch, IEntitySearchOne } from '../tarmaq.dao.index';
import { QApp } from '@airport/aviation-communication';

/**
 * Facade for all DB operations related to a particular Entity.
 */
export interface IEntityDatabaseFacade<IEntity,
    EntitySelect extends IEntitySelectProperties,
    EntityCreateProperties extends IEntityCreateProperties,
    EntityUpdateColumns extends IEntityUpdateColumns,
    EntityUpdateProperties extends IEntityUpdateProperties,
    DbEntity_LocalId extends IEntityIdProperties,
    EntityCascadeGraph extends IEntityCascadeGraph,
    IQ extends IQEntity,
    QSchema extends QApp>
    extends IEntityQueryDatabaseFacade<IEntity,
    EntitySelect,
    EntityCreateProperties,
    EntityUpdateColumns,
    EntityUpdateProperties,
    DbEntity_LocalId,
    EntityCascadeGraph,
    IQ,
    QSchema> {

    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    find: IEntityFind<IEntity, Array<IEntity>, EntitySelect>;

    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    findOne: IEntityFindOne<IEntity, EntitySelect>;

    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    search: IEntitySearch<IEntity, Array<IEntity>, EntitySelect>;

    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    searchOne: IEntitySearchOne<IEntity, EntitySelect>;

}