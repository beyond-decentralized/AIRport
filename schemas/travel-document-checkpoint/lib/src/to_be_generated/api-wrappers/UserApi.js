import { DI } from "@airport/di";
import { USER_API } from "../api-tokens";
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
        return null;
    }
    async findUser(privateId) {
        return null;
    }
}
DI.set(USER_API, UserApi);
//# sourceMappingURL=UserApi.js.map