import { travelDocumentCheckpoint, USER_API } from './api-tokens';
export const TERMINAL_DAO = travelDocumentCheckpoint.token('TERMINAL_DAO');
export const USER_DAO = travelDocumentCheckpoint.token('USER_DAO');
USER_API.setDependencies({
    userDao: USER_DAO
});
//# sourceMappingURL=internal-tokens.js.map