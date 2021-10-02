import { Terminal, User } from '@airport/travel-document-checkpoint';
import { RepositoryActor } from '../repository/RepositoryActor';
import { ActorApplication } from './ActorApplication';
export declare type ActorId = number;
export declare type ActorUuId = string;
export declare class Actor {
    id: ActorId;
    user: User;
    terminal: Terminal;
    uuId: ActorUuId;
    actorApplications: ActorApplication[];
    repositoryActor: RepositoryActor[];
}
//# sourceMappingURL=Actor.d.ts.map