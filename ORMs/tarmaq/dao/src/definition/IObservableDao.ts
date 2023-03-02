import { IContext, Injected } from "@airport/direction-indicator";
import { AirEntityId } from "@airport/aviation-communication"
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, Y } from "@airport/tarmaq-query";
import { Observable } from "rxjs";
import { IDao } from "./IDao";

export interface IObservableDao<Entity,
    EntitySelect extends IEntitySelectProperties,
    EntityCreate extends IEntityCreateProperties,
    EntityUpdateColumns extends IEntityUpdateColumns,
    EntityUpdateProperties extends IEntityUpdateProperties,
    DbEntity_LocalId extends IEntityIdProperties,
    EntityCascadeGraph extends IEntityCascadeGraph,
    IQE extends IQEntity>
    extends IDao<Entity,
        EntitySelect,
        EntityCreate,
        EntityUpdateColumns,
        EntityUpdateProperties,
        DbEntity_LocalId,
        EntityCascadeGraph,
        IQE> {

    searchAll(
        entityIds?: DbEntity_LocalId[],
        context?: IContext
    ): Observable<Entity[]>;

    searchAllAsTrees(
        entityIds?: DbEntity_LocalId[],
        context?: IContext
    ): Observable<Entity[]>;

    searchOne(
        airEntityId: Entity | AirEntityId | string,
        context?: IContext
    ): Observable<Entity>;

    searchIn(
        airEntityIds: Entity[] | AirEntityId[] | string[],
        context?: IContext
    ): Observable<Entity[]>;
}
