import { lib } from '@airport/di';
import { USER_API } from './api-tokens';
// Easier to define in each of tokens files, for understandability
export const travelDocumentCheckpoint = lib('travel-document-checkpoint');
export const TERMINAL_DAO = travelDocumentCheckpoint.token('TERMINAL_DAO');
export const USER_DAO = travelDocumentCheckpoint.token('USER_DAO');
USER_API.setDependencies({
    userDao: USER_DAO
});
//# sourceMappingURL=internal-tokens.js.map