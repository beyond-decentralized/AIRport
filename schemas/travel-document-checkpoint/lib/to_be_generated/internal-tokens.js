import { TerminalDao } from '../dao/TerminalDao';
import { UserDao } from '../dao/UserDao';
import { travelDocumentCheckpoint, USER_API } from './api-tokens';
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
USER_API.setDependencies({
    userDao: USER_DAO
});
//# sourceMappingURL=internal-tokens.js.map