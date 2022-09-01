var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Api } from "@airport/check-in";
import { Inject, Injected } from "@airport/direction-indicator";
let UserAccountApi = class UserAccountApi {
    async findUserAccount(privateId) {
        const userAccounts = await this.userAccountDao.findByGUIDs([privateId]);
        if (userAccounts.length) {
            return userAccounts[0];
        }
        return null;
    }
};
__decorate([
    Inject()
], UserAccountApi.prototype, "userAccountDao", void 0);
__decorate([
    Api()
], UserAccountApi.prototype, "findUserAccount", null);
UserAccountApi = __decorate([
    Injected()
], UserAccountApi);
export { UserAccountApi };
//# sourceMappingURL=UserAccountApi.js.map