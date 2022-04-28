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
        return await this.interAppApiClient.invokeApiMethod(USER_API, 'addUser', [username, email]);
    }
    async findUser(privateId) {
        return await this.interAppApiClient.invokeApiMethod(USER_API, 'findUser', [privateId]);
    }
}
//# sourceMappingURL=UserApi.js.map