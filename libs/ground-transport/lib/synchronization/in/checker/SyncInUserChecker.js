var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInUserChecker = class SyncInUserChecker {
    async ensureUsers(message, context) {
        try {
            let userUuids = [];
            let messageUserIndexMap = new Map();
            for (let i = 0; i < message.users.length; i++) {
                const user = message.users[i];
                if (typeof user.uuId !== 'string' || user.uuId.length !== 36) {
                    throw new Error(`Invalid 'user.uuid'`);
                }
                if (typeof user.username !== 'string' || user.username.length < 3) {
                    throw new Error(`Invalid 'user.username'`);
                }
                userUuids.push(user.uuId);
                messageUserIndexMap.set(user.uuId, i);
                // Make sure id field is not in the input
                delete user.id;
            }
            const users = await this.userDao.findByUuIds(userUuids);
            for (const user of users) {
                const messageUserIndex = messageUserIndexMap.get(user.uuId);
                message.users[messageUserIndex] = user;
            }
            const missingUsers = message.users.filter(messageUser => !messageUser.id);
            if (missingUsers.length) {
                await this.addMissingUsers(missingUsers, context);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async addMissingUsers(missingUsers, context) {
        for (const user of missingUsers) {
            if (!user.username || typeof user.username !== 'string') {
                throw new Error(`Invalid User.username ${user.username}`);
            }
        }
        await this.userDao.insert(missingUsers, context);
    }
};
__decorate([
    Inject()
], SyncInUserChecker.prototype, "userDao", void 0);
SyncInUserChecker = __decorate([
    Injected()
], SyncInUserChecker);
export { SyncInUserChecker };
//# sourceMappingURL=SyncInUserChecker.js.map