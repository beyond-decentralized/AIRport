import { AgtRepositoryTransactionBlock } from "../synchronization/AgtRepositoryTransactionBlock";
import { Terminal } from "../terminal/Terminal";
import { SecurityAnswer } from "./security/SecurityAnswer";
import { UserRepository } from "./UserRepository";
export declare type User_Id = number;
export declare type UserHash = string;
export declare type UserEmail = string;
export declare type UserIsInvitation = boolean;
export declare class User {
    id: User_Id;
    hash: UserHash;
    email: UserEmail;
    isInvitation: UserIsInvitation;
    securityAnswers: SecurityAnswer[];
    userRepositories: UserRepository[];
    terminals: Terminal[];
    repositoryTransactionBlocks: AgtRepositoryTransactionBlock[];
}
//# sourceMappingURL=User.d.ts.map