import { DI } from '@airport/di';
import { USER_DAO } from '../tokens';
import { BaseUserDao, Q, } from '../generated/generated';
export class UserDao extends BaseUserDao {
    async findByUserNames(usernames) {
        let u;
        return await this.db.find.tree({
            select: {},
            from: [
                u = Q.User
            ],
            where: u.username.in(usernames)
        });
    }
    async findByUuIds(uuIds) {
        let u;
        return await this.db.find.tree({
            select: {},
            from: [
                u = Q.User
            ],
            where: u.uuId.in(uuIds)
        });
    }
}
DI.set(USER_DAO, UserDao);
//# sourceMappingURL=UserDao.js.map