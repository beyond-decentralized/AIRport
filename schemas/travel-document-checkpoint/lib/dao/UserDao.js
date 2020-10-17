import { DI } from '@airport/di';
import { USER_DAO } from '../tokens';
import { BaseUserDao, Q } from '../generated/generated';
export class UserDao extends BaseUserDao {
    // @Operation<UserECascadeGraph>({
    //
    // })
    // createNew = this.create
    async findMapByUniqueId(userUniqueIds) {
        return await this.findFieldsMapByUniqueId(userUniqueIds, {});
    }
    async findFieldsMapByUniqueId(userUniqueIds, select) {
        const userMap = new Map();
        const users = await this.findFieldsByUniqueId(userUniqueIds, {});
        for (const user of users) {
            userMap.set(user.uniqueId, user);
        }
        return userMap;
    }
    async findByUniqueId(uniqueIds) {
        return await this.findFieldsByUniqueId(uniqueIds, {});
    }
    async findFieldsByUniqueId(uniqueIds, select) {
        let u;
        return await this.db.find.tree({
            select,
            from: [
                u = Q.User
            ],
            where: u.uniqueId.in(uniqueIds)
        });
    }
}
DI.set(USER_DAO, UserDao);
//# sourceMappingURL=UserDao.js.map