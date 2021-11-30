import { Terminal, User } from '@airport/travel-document-checkpoint';
import { RepositoryActor } from '../repository/RepositoryActor';
import { Schema } from '@airport/airspace';
export declare type ActorId = number;
export declare type ActorUuId = string;
export declare class Actor {
    id: ActorId;
    uuId: ActorUuId;
    user: User;
    terminal: Terminal;
    schema: Schema;
    repositoryActors: RepositoryActor[];
}
//# sourceMappingURL=Actor.d.ts.map