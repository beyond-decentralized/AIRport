import { Repository } from "../repository/Repository";
import { UserRepositoryPermission } from "./Permission";
import { User } from "./User";
export declare class UserRepository {
    repository: Repository;
    user: User;
    permission: UserRepositoryPermission;
}
