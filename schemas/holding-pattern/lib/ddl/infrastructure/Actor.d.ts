import { Terminal, UserAccount } from '@airport/travel-document-checkpoint';
import { Application } from '@airport/airspace';
export declare type Actor_LocalId = number;
export declare type Actor_GUID = string;
export declare class Actor {
    _localId?: Actor_LocalId;
    GUID?: Actor_GUID;
    userAccount: UserAccount;
    terminal?: Terminal;
    application?: Application;
}
//# sourceMappingURL=Actor.d.ts.map