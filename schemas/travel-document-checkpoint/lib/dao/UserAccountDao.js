var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseUserAccountDao, Q, } from '../generated/generated';
let UserAccountDao = class UserAccountDao extends BaseUserAccountDao {
    async findByUserAccountNames(usernames) {
        let u;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [
                u = Q.UserAccount
            ],
            WHERE: u.username.IN(usernames)
        });
    }
    async findByGUIDs(GUIDs) {
        let u;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [
                u = Q.UserAccount
            ],
            WHERE: u.GUID.IN(GUIDs)
        });
    }
    async insert(userAccounts, context) {
        let u;
        const VALUES = [];
        for (const userAccount of userAccounts) {
            VALUES.push([
                userAccount.GUID, userAccount.username
            ]);
        }
        const _localIds = await this.db.insertValuesGenerateIds({
            INSERT_INTO: u = Q.UserAccount,
            columns: [
                u.GUID,
                u.username
            ],
            VALUES
        }, context);
        for (let i = 0; i < userAccounts.length; i++) {
            const userAccount = userAccounts[i];
            userAccount._localId = _localIds[i][0];
        }
    }
};
UserAccountDao = __decorate([
    Injected()
], UserAccountDao);
export { UserAccountDao };
//# sourceMappingURL=UserAccountDao.js.map