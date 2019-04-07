import {diToken}                                        from '@airport/di'
import {ISynchronizationConflictDao}                    from "./dao/conflict/SynchronizationConflictDao";
import {ISynchronizationConflictPendingNotificationDao} from "./dao/conflict/SynchronizationConflictPendingNotificationDao";
import {ISynchronizationConflictValuesDao}              from "./dao/conflict/SynchronizationConflictValuesDao";
import {IMissingRecordDao}                              from "./dao/missingRecord/MissingRecordDao";
import {IMissingRecordRepoTransBlockDao}                from "./dao/missingRecord/MissingRecordRepoTransBlockDao";
import {IRecordUpdateStageDao}                          from "./dao/RecordUpdateStageDao";
import {IRepositoryTransactionBlockDao}                 from "./dao/repositoryTransactionBlock/RepositoryTransactionBlockDao";
import {IRepositoryTransactionHistoryUpdateStageDao}    from "./dao/repositoryTransactionBlock/RepositoryTransactionHistoryUpdateStageDao";
import {IRepoTransBlockResponseStageDao}                from "./dao/repositoryTransactionBlock/RepoTransBlockResponseStageDao";
import {IRepoTransBlockSchemaToChangeDao}  from "./dao/repositoryTransactionBlock/RepoTransBlockSchemaToChangeDao";
import {ISharingMessageDao}                 from "./dao/sharingMessage/SharingMessageDao";
import {ISharingMessageRepoTransBlockDao}   from "./dao/sharingMessage/SharingMessageRepoTransBlockDao";
import {ISharingNodeDao}                    from "./dao/sharingNode/SharingNodeDao";
import {ISharingNodeTerminalDao}            from "./dao/sharingNode/SharingNodeTerminalDao";
import {ISharingNodeRepositoryDao}          from "./dao/sharingNode/SharingNodeRepositoryDao";
import {ISharingNodeRepoTransBlockDao}      from "./dao/sharingNode/SharingNodeRepoTransBlockDao";
import {ISharingNodeRepoTransBlockStageDao} from "./dao/sharingNode/SharingNodeRepoTransBlockStageDao";
import {IRepositoryTransactionBlockDuo}     from "./duo/repositoryTransactionBlock/RepositoryTransactionBlockDuo";

export const MISSING_RECORD_DAO      = diToken<IMissingRecordDao>();
export const MISSING_RECORD_REPO_TRANS_BLOCK_DAO
                                     = diToken<IMissingRecordRepoTransBlockDao>();
export const RECORD_UPDATE_STAGE_DAO = diToken<IRecordUpdateStageDao>();
export const REPO_TRANS_BLOCK_DAO
	                                                = diToken<IRepositoryTransactionBlockDao>();
export const REPO_TRANS_BLOCK_DUO
	                                                = diToken<IRepositoryTransactionBlockDuo>();
export const REPO_TRANS_HISTORY_UPDATE_STAGE_DAO
	                                                = diToken<IRepositoryTransactionHistoryUpdateStageDao>();
export const REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO
	                                                = diToken<IRepoTransBlockResponseStageDao>();
export const SHARING_MESSAGE_DAO                  = diToken<ISharingMessageDao>();
export const SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO = diToken<ISharingMessageRepoTransBlockDao>();
// export const SharingMessageResponseStageDaoToken
// 	= diToken<ISharingMessageResponseStageDao>();
export const REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO
	                                             = diToken<IRepoTransBlockSchemaToChangeDao>();
export const SHARING_NODE_DAO                  = diToken<ISharingNodeDao>();
export const SHARING_NODE_TERMINAL_DAO         = diToken<ISharingNodeTerminalDao>();
export const SHARING_NODE_REPOSITORY_DAO       = diToken<ISharingNodeRepositoryDao>();
export const SHARING_NODE_REPO_TRANS_BLOCK_DAO = diToken<ISharingNodeRepoTransBlockDao>();
export const SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO
	                                             = diToken<ISharingNodeRepoTransBlockStageDao>();
export const SYNC_CONFLICT_DAO
	                                             = diToken<ISynchronizationConflictDao>();
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO
	                                             = diToken<ISynchronizationConflictPendingNotificationDao>();
export const SYNC_CONFLICT_VALUES_DAO
	= diToken<ISynchronizationConflictValuesDao>();
