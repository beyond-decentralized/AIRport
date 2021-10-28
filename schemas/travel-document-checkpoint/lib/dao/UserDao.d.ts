import { User_Email, User_PrivateId, User_PublicId, User_Username } from '../ddl/ddl';
import { BaseUserDao, IBaseUserDao, IUser } from '../generated/generated';
export interface IUserDao extends IBaseUserDao {
    findByEmailsOrUserNames(emails: User_Email[], usernames: User_Username[]): Promise<IUser[]>;
    findByPrivateIds(privateIds: User_PrivateId[]): Promise<IUser[]>;
    findByPublicIds(publicIds: User_PublicId[]): Promise<IUser[]>;
}
export declare class UserDao extends BaseUserDao implements IUserDao {
    findByEmailsOrUserNames(emails: User_Email[], usernames: User_Username[]): Promise<IUser[]>;
    findByPrivateIds(privateIds: User_PrivateId[]): Promise<IUser[]>;
    findByPublicIds(publicIds: User_PublicId[]): Promise<IUser[]>;
}
//# sourceMappingURL=UserDao.d.ts.map