import { Terminal, User } from '@airport/travel-document-checkpoint';
import { Application } from '@airport/territory';
import { RepositoryActor } from '../repository/RepositoryActor';
export declare type ActorId = number;
export declare type ActorUuId = string;
export declare class Actor {
    id: ActorId;
    user: User;
    terminal: Terminal;
    uuId: ActorUuId;
    application: Application;
    repositoryActors: RepositoryActor[];
}
//# sourceMappingURL=Actor.d.ts.map