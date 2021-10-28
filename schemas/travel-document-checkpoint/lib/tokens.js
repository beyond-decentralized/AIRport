import { lib } from '@airport/di';
const travelDocumentCheckpoint = lib('travel-document-checkpoint');
export const TERMINAL_DAO = travelDocumentCheckpoint.token('ITerminalDao');
export const USER_API = travelDocumentCheckpoint.token('IUserApi');
export const USER_DAO = travelDocumentCheckpoint.token('IUserDao');
//# sourceMappingURL=tokens.js.map