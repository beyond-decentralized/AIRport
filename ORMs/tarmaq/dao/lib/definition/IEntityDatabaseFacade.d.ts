import { IEntityFind } from './query/EntityFind';
import { IEntityFindOne } from './query/EntityFindOne';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntityQueryDatabaseFacade, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
/**
 * Facade for all DB operations related to a particular Entity.
 */
export interface IEntityDatabaseFacade<IEntity, EntitySelect extends IEntitySelectProperties, EntityCreateProperties extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQ extends IQEntity> extends IEntityQueryDatabaseFacade<IEntity, EntitySelect, EntityCreateProperties, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQ> {
    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    find: IEntityFind<IEntity, Array<IEntity>, EntitySelect>;
    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    findOne: IEntityFindOne<IEntity, EntitySelect>;
}
//# sourceMappingURL=IEntityDatabaseFacade.d.ts.map