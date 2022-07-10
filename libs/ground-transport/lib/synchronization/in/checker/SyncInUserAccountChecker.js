var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInUserAccountChecker = class SyncInUserAccountChecker {
    async ensureUserAccounts(message, context) {
        try {
            let userAccountGUIDs = [];
            let messageUserAccountIndexMap = new Map();
            for (let i = 0; i < message.userAccounts.length; i++) {
                const userAccount = message.userAccounts[i];
                if (typeof userAccount.GUID !== 'string' || userAccount.GUID.length !== 36) {
                    throw new Error(`Invalid 'userAccount.GUID'`);
                }
                if (typeof userAccount.username !== 'string' || userAccount.username.length < 3) {
                    throw new Error(`Invalid 'userAccount.username'`);
                }
                userAccountGUIDs.push(userAccount.GUID);
                messageUserAccountIndexMap.set(userAccount.GUID, i);
                // Make sure id field is not in the input
                delete userAccount._localId;
            }
            const userAccounts = await this.userAccountDao.findByGUIDs(userAccountGUIDs);
            for (const userAccount of userAccounts) {
                const messageUserAccountIndex = messageUserAccountIndexMap.get(userAccount.GUID);
                message.userAccounts[messageUserAccountIndex] = userAccount;
            }
            const missingUserAccounts = message.userAccounts.filter(messageUserAccount => !messageUserAccount._localId);
            if (missingUserAccounts.length) {
                await this.addMissingUserAccounts(missingUserAccounts, context);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async addMissingUserAccounts(missingUserAccounts, context) {
        for (const userAccount of missingUserAccounts) {
            if (!userAccount.username || typeof userAccount.username !== 'string') {
                throw new Error(`Invalid UserAccount.username ${userAccount.username}`);
            }
        }
        await this.userAccountDao.insert(missingUserAccounts, context);
    }
};
__decorate([
    Inject()
], SyncInUserAccountChecker.prototype, "userAccountDao", void 0);
SyncInUserAccountChecker = __decorate([
    Injected()
], SyncInUserAccountChecker);
export { SyncInUserAccountChecker };
//# sourceMappingURL=SyncInUserAccountChecker.js.map