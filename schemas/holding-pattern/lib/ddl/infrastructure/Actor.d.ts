import { Terminal, User } from '@airport/travel-document-checkpoint/lib/to_be_generated';
import { Application } from '@airport/airspace';
export declare type Actor_Id = number;
export declare type Actor_UuId = string;
export declare class Actor {
    id: Actor_Id;
    uuId: Actor_UuId;
    user: User;
    terminal: Terminal;
    application: Application;
}
//# sourceMappingURL=Actor.d.ts.map