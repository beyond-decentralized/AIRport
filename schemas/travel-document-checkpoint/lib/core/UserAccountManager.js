var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from "@airport/direction-indicator";
import { v4 as guidv4 } from "uuid";
export var AddUserAccountErrorCodes;
(function (AddUserAccountErrorCodes) {
    AddUserAccountErrorCodes["EMAIL_TAKEN"] = "EMAIL_TAKEN";
    AddUserAccountErrorCodes["INVALID_BIRTH_MONTH"] = "INVALID_BIRTH_MONTH";
    AddUserAccountErrorCodes["INVALID_COUNTRY"] = "INVALID_COUNTRY";
    AddUserAccountErrorCodes["INVALID_EMAIL"] = "INVALID_EMAIL";
    AddUserAccountErrorCodes["INVALID_USERNAME"] = "INVALID_USERNAME";
    AddUserAccountErrorCodes["USER_ACCOUNTNAME_TAKEN"] = "USER_ACCOUNTNAME_TAKEN";
})(AddUserAccountErrorCodes || (AddUserAccountErrorCodes = {}));
let UserAccountManager = class UserAccountManager {
    async addUserAccount(username, email, password) {
        const existingUserAccounts = await this.userAccountDao.findByUserAccountNames([username]);
        for (const existingUserAccount of existingUserAccounts) {
            if (existingUserAccount.username === username) {
                return {
                    errorCode: AddUserAccountErrorCodes.USER_ACCOUNTNAME_TAKEN
                };
            }
        }
        const passwordHash = await this.sha512(password);
        const userAccount = {
            _localId: null,
            email,
            GUID: guidv4(),
            passwordHash,
            username
        };
        await this.userAccountDao.save(userAccount);
        return {
            userAccount
        };
    }
    sha512(str) {
        return crypto.subtle.digest("SHA-512", new TextEncoder( /*"utf-8"*/).encode(str)).then(buf => {
            return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
        });
    }
};
__decorate([
    Inject()
], UserAccountManager.prototype, "userAccountDao", void 0);
UserAccountManager = __decorate([
    Injected()
], UserAccountManager);
export { UserAccountManager };
//# sourceMappingURL=UserAccountManager.js.map