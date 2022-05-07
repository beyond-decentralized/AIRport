import { UserApi } from '../api/UserApi';
import { TerminalDao } from '../dao/TerminalDao';
import { UserDao } from '../dao/UserDao';
import { travelDocumentCheckpoint, USER_API } from './common-tokens';
export const TERMINAL_DAO = travelDocumentCheckpoint.token({
    class: TerminalDao,
    interface: 'ITerminalDao',
    token: 'TERMINAL_DAO'
});
export const USER_DAO = travelDocumentCheckpoint.token({
    class: UserDao,
    interface: 'IUserDao',
    token: 'USER_DAO'
});
USER_API.setClass(UserApi);
USER_API.setDependencies({
    userDao: USER_DAO
});
//# sourceMappingURL=runtime-tokens.js.map