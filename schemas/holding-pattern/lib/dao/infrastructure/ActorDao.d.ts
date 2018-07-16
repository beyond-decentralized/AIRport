import { IUtils } from "@airport/air-control";
import { ActorId, ActorRandomId, DatabaseId, UserId } from "../../ddl/ddl";
import { BaseActorDao, IActor, IBaseActorDao } from "../../generated/generated";
export interface IActorDao extends IBaseActorDao {
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findWithDetailsByGlobalIds(randomIds: ActorRandomId[], userIds: UserId[], databaseIds: DatabaseId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(randomIds: ActorRandomId[], userIds: UserId[], databaseIds: DatabaseId[], actorMap: Map<UserId, Map<DatabaseId, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
}
export declare class ActorDao extends BaseActorDao implements IActorDao {
    constructor(utils: IUtils);
    findWithDetailsAndGlobalIdsByIds(actorIds: ActorId[]): Promise<IActor[]>;
    findMapsWithDetailsByGlobalIds(randomIds: ActorRandomId[], userIds: UserId[], databaseIds: DatabaseId[], actorMap: Map<UserId, Map<DatabaseId, IActor>>, actorMapById: Map<ActorId, IActor>): Promise<void>;
    findWithDetailsByGlobalIds(randomIds: ActorRandomId[], userIds: UserId[], databaseIds: DatabaseId[]): Promise<IActor[]>;
    private findWithDetailsAndGlobalIdsByWhereClause;
}
