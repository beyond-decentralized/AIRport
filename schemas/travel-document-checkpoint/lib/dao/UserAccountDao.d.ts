import { IContext } from '@airport/direction-indicator';
import { UserAccount_GUID, UserAccount_UserAccountname } from '../ddl/ddl';
import { BaseUserAccountDao, IBaseUserAccountDao, IUserAccount } from '../generated/generated';
export interface IUserAccountDao extends IBaseUserAccountDao {
    findByUserAccountNames(usernames: UserAccount_UserAccountname[]): Promise<IUserAccount[]>;
    findByGUIDs(GUIDs: UserAccount_GUID[]): Promise<IUserAccount[]>;
    insert(userAccounts: IUserAccount[], context: IContext): Promise<void>;
}
export declare class UserAccountDao extends BaseUserAccountDao implements IUserAccountDao {
    findByUserAccountNames(usernames: UserAccount_UserAccountname[]): Promise<IUserAccount[]>;
    findByGUIDs(GUIDs: UserAccount_GUID[]): Promise<IUserAccount[]>;
    insert(userAccounts: IUserAccount[], context: IContext): Promise<void>;
}
//# sourceMappingURL=UserAccountDao.d.ts.map