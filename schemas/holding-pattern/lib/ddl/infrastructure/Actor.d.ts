import { Terminal, User } from '@airport/travel-document-checkpoint';
import { RepositoryActor } from '../repository/RepositoryActor';
import { Schema } from '@airport/traffic-pattern';
export declare type ActorId = number;
export declare type ActorUuId = string;
export declare class Actor {
    id: ActorId;
    user: User;
    terminal: Terminal;
    uuId: ActorUuId;
    schema: Schema;
    repositoryActors: RepositoryActor[];
}
//# sourceMappingURL=Actor.d.ts.map