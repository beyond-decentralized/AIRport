import { Client, Terminal, User } from '@airport/travel-document-checkpoint';
import { Application } from '@airport/airspace';
export declare type Actor_Id = number;
export declare type Actor_GUID = string;
export declare class Actor {
    id?: Actor_Id;
    GUID?: Actor_GUID;
    user: User;
    terminal?: Terminal;
    application?: Application;
    client?: Client;
}
//# sourceMappingURL=Actor.d.ts.map