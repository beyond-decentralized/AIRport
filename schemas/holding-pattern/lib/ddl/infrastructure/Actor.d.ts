import { Terminal, User } from '@airport/travel-document-checkpoint';
import { IActor } from '../../generated/infrastructure/qactor';
import { IActorApplication } from '../../generated/infrastructure/qactorapplication';
import { IRepositoryActor } from '../../generated/repository/qrepositoryactor';
export declare type ActorId = number;
export declare type ActorRandomId = number;
export declare class Actor implements IActor {
    id: ActorId;
    user: User;
    terminal: Terminal;
    randomId: ActorRandomId;
    actorApplications: IActorApplication[];
    repositoryActor: IRepositoryActor[];
}
