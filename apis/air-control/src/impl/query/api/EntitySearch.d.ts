import { DbEntity } from "@airport/ground-control";
import { Observable } from "rxjs";
import { IEntitySelectProperties } from "../../../lingo/core/entity/Entity";
import { IDatabaseFacade } from "../../../lingo/core/repository/DatabaseFacade";
import { IEntitySearch } from "../../../lingo/query/api/EntitySearch";
import { RawEntityQuery } from "../../../lingo/query/facade/EntityQuery";
import { MappedEntityArray } from "../../../lingo/query/MappedEntityArray";
import { IUtils } from "../../../lingo/utils/Utils";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>> implements IEntitySearch<Entity, EntityArray, IESP> {
    protected dbEntity: DbEntity;
    protected dbFacade: IDatabaseFacade;
    private utils;
    constructor(dbEntity: DbEntity, dbFacade: IDatabaseFacade, utils: IUtils);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Observable<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Observable<EntityArray>;
}
