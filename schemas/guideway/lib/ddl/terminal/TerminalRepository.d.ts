import { Repository } from "../repository/Repository";
import { UserRepositoryPermission } from "../user/Permission";
import { Terminal } from "./Terminal";
export declare type TerminalRepositoryPermission = UserRepositoryPermission;
/**
 * Records all Repositories that a given terminal subscribes too.
 */
export declare class TerminalRepository {
    terminal: Terminal;
    repository: Repository;
    permission: TerminalRepositoryPermission;
}
