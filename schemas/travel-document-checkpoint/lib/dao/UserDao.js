var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseUserDao, Q, } from '../generated/generated';
let UserDao = class UserDao extends BaseUserDao {
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
    async insert(users, context) {
        let u;
        const values = [];
        for (const user of users) {
            values.push([
                user.uuId, user.username
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            insertInto: u = Q.User,
            columns: [
                u.uuId,
                u.username
            ],
            values
        }, context);
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            user.id = ids[i][0];
        }
    }
};
UserDao = __decorate([
    Injected()
], UserDao);
export { UserDao };
//# sourceMappingURL=UserDao.js.map