import { travelDocumentCheckpoint } from "../to_be_generated/common-tokens";
import { USER_ACCOUNT_DAO } from "../to_be_generated/runtime-tokens";
import { UserAccountManager } from "./UserAccountManager";
export const USER_ACCOUNT_MANAGER = travelDocumentCheckpoint.token({
    class: UserAccountManager,
    interface: 'IUserAccountManager',
    token: 'USER_ACCOUNT_MANAGER'
});
USER_ACCOUNT_MANAGER.setDependencies({
    userAccountDao: USER_ACCOUNT_DAO
});
//# sourceMappingURL=core-tokens.js.map