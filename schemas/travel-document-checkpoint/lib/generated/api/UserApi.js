var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected, } from '@airport/direction-indicator';
// An API stub for other Applications and UIs to use
let UserApi = class UserApi {
    async addUser(username, email) {
        return await this.userApi.addUser(username, email);
    }
    async findUser(privateId) {
        return await this.userApi.findUser(privateId);
    }
};
__decorate([
    Inject()
], UserApi.prototype, "userApi", void 0);
UserApi = __decorate([
    Injected()
], UserApi);
export { UserApi };
//# sourceMappingURL=UserApi.js.map