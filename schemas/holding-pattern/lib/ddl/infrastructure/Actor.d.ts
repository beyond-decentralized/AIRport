import { Terminal, User } from '@airport/travel-document-checkpoint';
import { RepositoryActor } from '../repository/RepositoryActor';
import { ActorApplication } from './ActorApplication';
export declare type ActorId = number;
export declare type ActorRandomId = number;
export declare class Actor {
    id: ActorId;
    user: User;
    terminal: Terminal;
    randomId: ActorRandomId;
    actorApplications: ActorApplication[];
    repositoryActor: RepositoryActor[];
}
