import { Terminal, User } from '@airport/travel-document-checkpoint';
import { RepositoryActor } from '../repository/RepositoryActor';
import { Schema } from '@airport/airspace';
export declare type Actor_Id = number;
export declare type Actor_UuId = string;
export declare class Actor {
    id: Actor_Id;
    uuId: Actor_UuId;
    user: User;
    terminal: Terminal;
    schema: Schema;
    repositoryActors: RepositoryActor[];
}
//# sourceMappingURL=Actor.d.ts.map