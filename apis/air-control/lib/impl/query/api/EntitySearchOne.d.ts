import { DbEntity } from "@airport/ground-control";
import { IObservable } from "@airport/observe";
import { IEntitySelectProperties } from "../../../lingo/core/entity/Entity";
import { IDatabaseFacade } from "../../../lingo/core/repository/DatabaseFacade";
import { IEntitySearchOne } from "../../../lingo/query/api/EntitySearchOne";
import { RawEntityQuery } from "../../../lingo/query/facade/EntityQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export declare class EntitySearchOne<Entity, IESP extends IEntitySelectProperties> extends EntityLookup<EntitySearchOne<Entity, IESP>, EntitySearchOne<Entity, IESP>> implements IEntitySearchOne<Entity, IESP> {
    protected dbEntity: DbEntity;
    protected dbFacade: IDatabaseFacade;
    private utils;
    constructor(dbEntity: DbEntity, dbFacade: IDatabaseFacade, utils: IUtils);
    graph(rawGraphQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<Entity>;
    tree(rawTreeQuery: RawEntityQuery<IESP> | {
        (...args: any[]): RawEntityQuery<IESP>;
    }): IObservable<Entity>;
}
