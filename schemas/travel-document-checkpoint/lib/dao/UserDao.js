"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class UserDao extends generated_1.BaseUserDao {
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
                u = generated_1.Q.User
            ],
            where: u.uniqueId.in(uniqueIds)
        });
    }
}
exports.UserDao = UserDao;
di_1.DI.set(tokens_1.USER_DAO, UserDao);
//# sourceMappingURL=UserDao.js.map