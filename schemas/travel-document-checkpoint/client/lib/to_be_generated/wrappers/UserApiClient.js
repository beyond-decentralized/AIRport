import { IOC } from "@airport/direction-indicator";
import { USER_API } from "../tokens";
export var AddUserErrorCodes;
(function (AddUserErrorCodes) {
    AddUserErrorCodes["EMAIL_TAKEN"] = "EMAIL_TAKEN";
    AddUserErrorCodes["INVALID_BIRTH_MONTH"] = "INVALID_BIRTH_MONTH";
    AddUserErrorCodes["INVALID_COUNTRY"] = "INVALID_COUNTRY";
    AddUserErrorCodes["INVALID_EMAIL"] = "INVALID_EMAIL";
    AddUserErrorCodes["INVALID_USERNAME"] = "INVALID_USERNAME";
    AddUserErrorCodes["USERNAME_TAKEN"] = "USERNAME_TAKEN";
})(AddUserErrorCodes || (AddUserErrorCodes = {}));
export class UserApiClient {
    async addUser(username, email) {
        const userApi = await IOC.get(USER_API);
        return await userApi.addUser(username, email);
    }
    async findUser(privateId) {
        const userApi = await IOC.get(USER_API);
        return await userApi.findUser(privateId);
    }
}
//# sourceMappingURL=UserApiClient.js.map