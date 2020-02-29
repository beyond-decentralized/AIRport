import { system } from '@airport/di';
const guideway = system('airport').lib('guideway');
export const DAILY_ARCHIVE_LOG_DAO = guideway.token();
export const TERMINAL_DAO = guideway.token();
export const TERMINAL_REPOSITORY_DAO = guideway.token();
export const REPOSITORY_DAO = guideway.token();
export const SYNC_LOG_DAO = guideway.token();
export const AGT_SHARING_MESSAGE_DAO = guideway.token();
export const AGT_REPO_TRANS_BLOCK_DAO = guideway.token();
//# sourceMappingURL=tokens.js.map