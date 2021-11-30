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
    async insert(users) {
        let u;
        const values = [];
        for (const user of users) {
            values.push([
                user.uuId, user.username
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: u = Q.User,
            columns: [
                u.uuId,
                u.username
            ],
            values
        });
    }
}
DI.set(USER_DAO, UserDao);
//# sourceMappingURL=UserDao.js.map