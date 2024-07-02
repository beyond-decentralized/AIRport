import { IContext, Injected } from "@airport/direction-indicator";
import { AirEntityId, QApp } from "@airport/aviation-communication"
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity, Y } from "@airport/tarmaq-query";
import { Observable } from "rxjs";
import { Dao } from "./Dao";

@Injected()
export abstract class ObservableDao<Entity,
    EntitySelect extends IEntitySelectProperties,
    EntityCreate extends IEntityCreateProperties,
    EntityUpdateColumns extends IEntityUpdateColumns,
    EntityUpdateProperties extends IEntityUpdateProperties,
    DbEntity_LocalId extends IEntityIdProperties,
    EntityCascadeGraph extends IEntityCascadeGraph,
    QE extends IQEntity,
    QSchema extends QApp>
    extends Dao<Entity, EntitySelect, EntityCreate,
        EntityUpdateColumns, EntityUpdateProperties, DbEntity_LocalId,
        EntityCascadeGraph, QE, QSchema> {

    searchAll(
        entityIds?: DbEntity_LocalId[],
        context?: IContext
    ): Observable<Entity[]> {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return this.db.search.graph({
            SELECT: <any>{},
            FROM: [this.db.FROM],
        }, context);
    }

    searchAllAsTrees(
        entityIds?: DbEntity_LocalId[],
        context?: IContext
    ): Observable<Entity[]> {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return this.db.search.tree({
            SELECT: <any>{},
            FROM: [this.db.FROM],
        }, context);

    }

    searchOne(
        airEntityId: Entity | AirEntityId | string,
        context?: IContext
    ): Observable<Entity> {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findOne can only be called for Repository Entities.`)
        }
        const idObject: AirEntityId = airEntityId as AirEntityId

        let q
        return this.db.searchOne.graph({
            SELECT: <any>{
                '*': Y
            },
            FROM: [
                q = this.db.FROM
            ],
            WHERE: q.equals(idObject)
        }, context)
    }

    searchIn(
        airEntityIds: Entity[] | AirEntityId[] | string[],
        context?: IContext
    ): Observable<Entity[]> {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findIn can only be called for Repository Entities.`)
        }

        let q
        return this.db.search.graph({
            SELECT: <any>{
                '*': Y
            },
            FROM: [
                q = this.db.FROM
            ],
            WHERE: q.IN(airEntityIds)
        }, context)
    }
}