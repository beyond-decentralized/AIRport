import { IActor } from "../../generated/infrastructure/qactor";
import { IActorApplication } from "../../generated/infrastructure/qactorapplication";
import { IUser } from "../../generated/infrastructure/quser";
import { IRepositoryActor } from "../../generated/repository/qrepositoryactor";
import { Terminal } from "./Terminal";
export declare type ActorId = number;
export declare type ActorRandomId = number;
export declare class Actor implements IActor {
    id: ActorId;
    user: IUser;
    terminal: Terminal;
    randomId: ActorRandomId;
    actorApplications: IActorApplication[];
    repositoryActor: IRepositoryActor[];
}
