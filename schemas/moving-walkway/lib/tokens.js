import { system } from '@airport/di';
const movingWalkway = system('airport').lib('moving-walkway');
export const MISSING_RECORD_DAO = movingWalkway.token();
export const MISSING_RECORD_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token();
export const REPO_TRANS_BLOCK_DAO = movingWalkway.token();
export const REPO_TRANS_BLOCK_DUO = movingWalkway.token();
export const REPO_TRANS_HISTORY_UPDATE_STAGE_DAO = movingWalkway.token();
export const REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO = movingWalkway.token();
export const SHARING_MESSAGE_DAO = movingWalkway.token();
export const SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
// export const SharingMessageResponseStageDaoToken
// 	= movingWalkway.token<ISharingMessageResponseStageDao>();
export const REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO = movingWalkway.token();
export const SHARING_NODE_DAO = movingWalkway.token();
export const SHARING_NODE_TERMINAL_DAO = movingWalkway.token();
export const SHARING_NODE_REPOSITORY_DAO = movingWalkway.token();
export const SHARING_NODE_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
export const SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO = movingWalkway.token();
export const SYNC_CONFLICT_DAO = movingWalkway.token();
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO = movingWalkway.token();
export const SYNC_CONFLICT_VALUES_DAO = movingWalkway.token();
//# sourceMappingURL=tokens.js.map