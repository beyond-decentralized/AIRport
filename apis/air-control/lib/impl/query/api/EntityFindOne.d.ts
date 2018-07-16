import { DbEntity } from "@airport/ground-control";
import { IEntitySelectProperties } from "../../../lingo/core/entity/Entity";
import { IDatabaseFacade } from "../../../lingo/core/repository/DatabaseFacade";
import { IEntityFindOne } from "../../../lingo/query/api/EntityFindOne";
import { RawEntityQuery } from "../../../lingo/query/facade/EntityQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntityFindOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntityFindOne<Entity, IESP>, EntityFindOne<Entity, IESP>> implements IEntityFindOne<Entity, IESP> {
    protected dbEntity: DbEntity;
    protected dbFacade: IDatabaseFacade;
    private utils;
    constructor(dbEntity: DbEntity, dbFacade: IDatabaseFacade, utils: IUtils);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): Promise<Entity>;
}
