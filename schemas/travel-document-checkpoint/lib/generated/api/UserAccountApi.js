var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { USER_ACCOUNT_API, } from '../../to_be_generated/common-tokens';
import { DEPENDENCY_INJECTION, Inject, Injected, } from '@airport/direction-indicator';
export var AddUserAccountErrorCodes;
(function (AddUserAccountErrorCodes) {
    AddUserAccountErrorCodes["EMAIL_TAKEN"] = "EMAIL_TAKEN";
    AddUserAccountErrorCodes["INVALID_BIRTH_MONTH"] = "INVALID_BIRTH_MONTH";
    AddUserAccountErrorCodes["INVALID_COUNTRY"] = "INVALID_COUNTRY";
    AddUserAccountErrorCodes["INVALID_EMAIL"] = "INVALID_EMAIL";
    AddUserAccountErrorCodes["INVALID_USERNAME"] = "INVALID_USERNAME";
    AddUserAccountErrorCodes["USER_ACCOUNTNAME_TAKEN"] = "USER_ACCOUNTNAME_TAKEN";
})(AddUserAccountErrorCodes || (AddUserAccountErrorCodes = {}));
// An API stub for other Applications and UIs to use
let UserAccountApi = class UserAccountApi {
    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, USER_ACCOUNT_API);
    }
    async addUserAccount(username, email) {
        return await this.userAccountApi.addUserAccount(username, email);
    }
    async findUserAccount(privateId) {
        return await this.userAccountApi.findUserAccount(privateId);
    }
};
__decorate([
    Inject()
], UserAccountApi.prototype, "userAccountApi", void 0);
UserAccountApi = __decorate([
    Injected()
], UserAccountApi);
export { UserAccountApi };
//# sourceMappingURL=UserAccountApi.js.map