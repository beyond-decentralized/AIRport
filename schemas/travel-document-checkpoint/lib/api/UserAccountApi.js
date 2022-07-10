var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Api } from "@airport/check-in";
import { v4 as guidv4 } from "uuid";
import { Injected } from "@airport/direction-indicator";
export var AddUserAccountErrorCodes;
(function (AddUserAccountErrorCodes) {
    AddUserAccountErrorCodes["EMAIL_TAKEN"] = "EMAIL_TAKEN";
    AddUserAccountErrorCodes["INVALID_BIRTH_MONTH"] = "INVALID_BIRTH_MONTH";
    AddUserAccountErrorCodes["INVALID_COUNTRY"] = "INVALID_COUNTRY";
    AddUserAccountErrorCodes["INVALID_EMAIL"] = "INVALID_EMAIL";
    AddUserAccountErrorCodes["INVALID_USERNAME"] = "INVALID_USERNAME";
    AddUserAccountErrorCodes["USER_ACCOUNTNAME_TAKEN"] = "USER_ACCOUNTNAME_TAKEN";
})(AddUserAccountErrorCodes || (AddUserAccountErrorCodes = {}));
let UserAccountApi = class UserAccountApi {
    async addUserAccount(username, email) {
        const existingUserAccounts = await this.userAccountDao.findByUserAccountNames([username]);
        for (const existingUserAccount of existingUserAccounts) {
            if (existingUserAccount.username === username) {
                return {
                    errorCode: AddUserAccountErrorCodes.USER_ACCOUNTNAME_TAKEN
                };
            }
        }
        const userAccount = {
            _localId: null,
            GUID: guidv4(),
            username
        };
        await this.userAccountDao.save(userAccount);
        return {
            userAccount
        };
    }
    async findUserAccount(privateId) {
        const userAccounts = await this.userAccountDao.findByGUIDs([privateId]);
        if (userAccounts.length) {
            return userAccounts[0];
        }
        return null;
    }
};
__decorate([
    Api()
], UserAccountApi.prototype, "addUserAccount", null);
__decorate([
    Api()
], UserAccountApi.prototype, "findUserAccount", null);
UserAccountApi = __decorate([
    Injected()
], UserAccountApi);
export { UserAccountApi };
//# sourceMappingURL=UserAccountApi.js.map