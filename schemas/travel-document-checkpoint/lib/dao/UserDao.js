import { DI } from '@airport/di';
import { USER_DAO } from '../tokens';
import { BaseUserDao, Q, } from '../generated/generated';
import { or } from '@airport/air-control';
export class UserDao extends BaseUserDao {
    async findByEmailsOrUserNames(emails, usernames) {
        let u;
        return await this.db.find.tree({
            select: {},
            from: [
                u = Q.User
            ],
            where: or(u.email.in(emails), u.username.in(usernames))
        });
    }
    async findByPrivateIds(privateIds) {
        let u;
        return await this.db.find.tree({
            select: {},
            from: [
                u = Q.User
            ],
            where: u.privateId.in(privateIds)
        });
    }
    async findByPublicIds(publicIds) {
        let u;
        return await this.db.find.tree({
            select: {},
            from: [
                u = Q.User
            ],
            where: u.publicId.in(publicIds)
        });
    }
}
DI.set(USER_DAO, UserDao);
//# sourceMappingURL=UserDao.js.map