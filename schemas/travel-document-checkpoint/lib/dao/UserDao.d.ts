import { IUtils } from '@airport/air-control/lib/lingo/utils/Utils';
import { UserUniqueId } from '../ddl/ddl';
import { BaseUserDao, IBaseUserDao, IUser, UserESelect } from '../generated/generated';
export interface IUserDao extends IBaseUserDao {
    findMapByUniqueId(userUniqueIds: UserUniqueId[]): Promise<Map<UserUniqueId, IUser>>;
    findFieldsMapByUniqueId(userUniqueIds: UserUniqueId[], select: UserESelect): Promise<Map<UserUniqueId, IUser>>;
    findByUniqueId(userUniqueIds: UserUniqueId[]): Promise<IUser[]>;
    findFieldsByUniqueId(userUniqueIds: UserUniqueId[], select: UserESelect): Promise<IUser[]>;
}
export declare class UserDao extends BaseUserDao implements IUserDao {
    constructor(utils: IUtils);
    findMapByUniqueId(userUniqueIds: UserUniqueId[]): Promise<Map<UserUniqueId, IUser>>;
    findFieldsMapByUniqueId(userUniqueIds: UserUniqueId[], select: UserESelect): Promise<Map<UserUniqueId, IUser>>;
    findByUniqueId(uniqueIds: UserUniqueId[]): Promise<IUser[]>;
    findFieldsByUniqueId(uniqueIds: UserUniqueId[], select: UserESelect): Promise<IUser[]>;
}
