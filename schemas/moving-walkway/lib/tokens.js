import { system } from '@airport/di';
const movingWalkway = system('airport').lib('moving-walkway');
export const MISSING_RECORD_DAO = movingWalkway.token('IMissingRecordDao');
export const MISSING_RECORD_REPO_TRANS_BLOCK_DAO = movingWalkway.token('IMissingRecordRepoTransBlockDao');
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token('IRecordUpdateStageDao');
export const REPO_TRANS_BLOCK_DAO = movingWalkway.token('IRepositoryTransactionBlockDao');
export const REPO_TRANS_BLOCK_DUO = movingWalkway.token('IRepositoryTransactionBlockDuo');
export const REPO_TRANS_HISTORY_UPDATE_STAGE_DAO = movingWalkway.token('IRepositoryTransactionHistoryUpdateStageDao');
export const REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO = movingWalkway.token('IRepoTransBlockResponseStageDao');
export const SHARING_MESSAGE_DAO = movingWalkway.token('ISharingMessageDao');
export const SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO = movingWalkway.token('ISharingMessageRepoTransBlockDao');
// export const SharingMessageResponseStageDaoToken
// 	= movingWalkway.token<ISharingMessageResponseStageDao>('ISharingMessageResponseStageDao');
export const REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO = movingWalkway.token('IRepoTransBlockSchemaToChangeDao');
export const SHARING_NODE_DAO = movingWalkway.token('ISharingNodeDao');
export const SHARING_NODE_TERMINAL_DAO = movingWalkway.token('ISharingNodeTerminalDao');
export const SHARING_NODE_REPOSITORY_DAO = movingWalkway.token('ISharingNodeRepositoryDao');
export const SHARING_NODE_REPO_TRANS_BLOCK_DAO = movingWalkway.token('ISharingNodeRepoTransBlockDao');
export const SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO = movingWalkway.token('ISharingNodeRepoTransBlockStageDao');
export const SYNC_CONFLICT_DAO = movingWalkway.token('ISynchronizationConflictDao');
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO = movingWalkway.token('ISynchronizationConflictPendingNotificationDao');
export const SYNC_CONFLICT_VALUES_DAO = movingWalkway.token('ISynchronizationConflictValuesDao');
//# sourceMappingURL=tokens.js.map