import { system } from '@airport/di';
const travelDocumentCheckpoint = system('airport').lib('travel-document-checkpoint');
export const TERMINAL_DAO = travelDocumentCheckpoint.token();
export const USER_DAO = travelDocumentCheckpoint.token();
//# sourceMappingURL=tokens.js.map