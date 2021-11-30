import { User_UuId, User_Username } from '../ddl/ddl';
import { BaseUserDao, IBaseUserDao, IUser } from '../generated/generated';
export interface IUserDao extends IBaseUserDao {
    findByUserNames(usernames: User_Username[]): Promise<IUser[]>;
    findByUuIds(uuIds: User_UuId[]): Promise<IUser[]>;
    insert(users: IUser[]): Promise<void>;
}
export declare class UserDao extends BaseUserDao implements IUserDao {
    findByUserNames(usernames: User_Username[]): Promise<IUser[]>;
    findByUuIds(uuIds: User_UuId[]): Promise<IUser[]>;
    insert(users: IUser[]): Promise<void>;
}
//# sourceMappingURL=UserDao.d.ts.map