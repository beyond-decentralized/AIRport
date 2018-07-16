import { IUtils } from "@airport/air-control";
import { ActorId, IRepositoryActor, RepositoryId } from "../..";
import { BaseRepositoryActorDao, IBaseRepositoryActorDao } from "../../generated/generated";
export interface IRepositoryActorDao extends IBaseRepositoryActorDao {
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, Set<ActorId>>>;
}
export declare class RepositoryActorDao extends BaseRepositoryActorDao implements IRepositoryActorDao {
    constructor(utils: IUtils);
    findAllForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<IRepositoryActor[]>;
    findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(repositoryIds: RepositoryId[]): Promise<Map<RepositoryId, Set<ActorId>>>;
}
