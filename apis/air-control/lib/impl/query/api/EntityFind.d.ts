import { DbEntity } from "@airport/ground-control";
import { IEntitySelectProperties } from "../../../lingo/core/entity/Entity";
import { IDatabaseFacade } from "../../../lingo/core/repository/DatabaseFacade";
import { IEntityFind } from "../../../lingo/query/api/EntityFind";
import { RawEntityQuery } from "../../../lingo/query/facade/EntityQuery";
import { MappedEntityArray } from "../../../lingo/query/MappedEntityArray";
import { IUtils } from "../../../lingo/utils/Utils";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>, EntityFind<Entity, MappedEntityArray<Entity>, IESP>> implements IEntityFind<Entity, EntityArray, IESP> {
    protected dbEntity: DbEntity;
    protected dbFacade: IDatabaseFacade;
    private utils;
    constructor(dbEntity: DbEntity, dbFacade: IDatabaseFacade, utils: IUtils);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<EntityArray>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<EntityArray>;
}
