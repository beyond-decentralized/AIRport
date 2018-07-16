import { IActor } from "../../generated/infrastructure/qactor";
import { IActorApplication } from "../../generated/infrastructure/qactorapplication";
import { IDatabase } from "../../generated/infrastructure/qdatabase";
import { IUser } from "../../generated/infrastructure/quser";
import { IRepositoryActor } from "../../generated/repository/qrepositoryactor";
export declare type ActorId = number;
export declare type ActorRandomId = number;
export declare class Actor implements IActor {
    id: ActorId;
    user: IUser;
    database: IDatabase;
    randomId: ActorRandomId;
    actorApplications: IActorApplication[];
    repositoryActor: IRepositoryActor[];
}
