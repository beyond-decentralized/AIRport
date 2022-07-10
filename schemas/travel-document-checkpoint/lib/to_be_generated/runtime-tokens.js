import { UserAccountApi } from '../api/UserAccountApi';
import { TerminalDao } from '../dao/TerminalDao';
import { UserAccountDao } from '../dao/UserAccountDao';
import { travelDocumentCheckpoint, USER_ACCOUNT_API } from './common-tokens';
export const TERMINAL_DAO = travelDocumentCheckpoint.token({
    class: TerminalDao,
    interface: 'ITerminalDao',
    token: 'TERMINAL_DAO'
});
export const USER_ACCOUNT_DAO = travelDocumentCheckpoint.token({
    class: UserAccountDao,
    interface: 'IUserAccountDao',
    token: 'USER_ACCOUNT_DAO'
});
USER_ACCOUNT_API.setClass(UserAccountApi);
USER_ACCOUNT_API.setDependencies({
    userAccountDao: USER_ACCOUNT_DAO
});
//# sourceMappingURL=runtime-tokens.js.map