import { system } from '@airport/di';
const guideway = system('airport').lib('guideway');
export const DAILY_ARCHIVE_LOG_DAO = guideway.token('IDailyArchiveLogDao');
export const TERMINAL_DAO = guideway.token('ITerminalDao');
export const TERMINAL_REPOSITORY_DAO = guideway.token('ITerminalRepositoryDao');
export const REPOSITORY_DAO = guideway.token('IRepositoryDao');
export const SYNC_LOG_DAO = guideway.token('ISyncLogDao');
export const AGT_SHARING_MESSAGE_DAO = guideway.token('IAgtSharingMessageDao');
export const AGT_REPO_TRANS_BLOCK_DAO = guideway.token('IAgtRepositoryTransactionBlockDao');
//# sourceMappingURL=tokens.js.map