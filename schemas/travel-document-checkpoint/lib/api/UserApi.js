var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Api } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { v4 as uuidv4 } from "uuid";
import { USER_API, USER_DAO } from "../tokens";
export var AddUserErrorCodes;
(function (AddUserErrorCodes) {
    AddUserErrorCodes["EMAIL_TAKEN"] = "EMAIL_TAKEN";
    AddUserErrorCodes["INVALID_BIRTH_MONTH"] = "INVALID_BIRTH_MONTH";
    AddUserErrorCodes["INVALID_COUNTRY"] = "INVALID_COUNTRY";
    AddUserErrorCodes["INVALID_EMAIL"] = "INVALID_EMAIL";
    AddUserErrorCodes["INVALID_USERNAME"] = "INVALID_USERNAME";
    AddUserErrorCodes["USERNAME_TAKEN"] = "USERNAME_TAKEN";
})(AddUserErrorCodes || (AddUserErrorCodes = {}));
export class UserApi {
    async addUser(username, email) {
        const userDao = await container(this).get(USER_DAO);
        const existingUsers = await userDao.findByUserNames([username]);
        for (const existingUser of existingUsers) {
            if (existingUser.username === username) {
                return {
                    errorCode: AddUserErrorCodes.USERNAME_TAKEN
                };
            }
        }
        const user = {
            id: null,
            uuId: uuidv4(),
            username
        };
        await userDao.save(user);
        return {
            user
        };
    }
    async findUser(privateId) {
        const userDao = await container(this).get(USER_DAO);
        const users = await userDao.findByUuIds([privateId]);
        if (users.length) {
            return users[0];
        }
        return null;
    }
}
__decorate([
    Api()
], UserApi.prototype, "addUser", null);
__decorate([
    Api()
], UserApi.prototype, "findUser", null);
DI.set(USER_API, UserApi);
//# sourceMappingURL=UserApi.js.map