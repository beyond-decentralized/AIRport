import { IContext } from '@airport/direction-indicator';
import { User_GUID, User_Username } from '../ddl/ddl';
import { BaseUserDao, IBaseUserDao, IUser } from '../generated/generated';
export interface IUserDao extends IBaseUserDao {
    findByUserNames(usernames: User_Username[]): Promise<IUser[]>;
    findByGUIDs(GUIDs: User_GUID[]): Promise<IUser[]>;
    insert(users: IUser[], context: IContext): Promise<void>;
}
export declare class UserDao extends BaseUserDao implements IUserDao {
    findByUserNames(usernames: User_Username[]): Promise<IUser[]>;
    findByGUIDs(GUIDs: User_GUID[]): Promise<IUser[]>;
    insert(users: IUser[], context: IContext): Promise<void>;
}
//# sourceMappingURL=UserDao.d.ts.map