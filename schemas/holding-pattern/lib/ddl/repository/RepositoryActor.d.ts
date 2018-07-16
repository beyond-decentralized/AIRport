import { IActor } from "../../generated/infrastructure/qactor";
import { IRepository } from "../../generated/repository/qrepository";
import { IRepositoryActor } from "../../generated/repository/qrepositoryactor";
/**
 * Created by Papa on 12/18/2016.
 */
/**
 * A record of device+datatabase that adds to a repository
 */
export declare class RepositoryActor implements IRepositoryActor {
    id: number;
    actor: IActor;
    repository: IRepository;
}
