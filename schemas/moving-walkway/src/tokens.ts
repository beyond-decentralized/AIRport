import {system}                                        from '@airport/di'
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

const movingWalkway = system('airport').lib('moving-walkway')

export const MISSING_RECORD_DAO      = movingWalkway.token<IMissingRecordDao>('IMissingRecordDao');
export const MISSING_RECORD_REPO_TRANS_BLOCK_DAO
                                     = movingWalkway.token<IMissingRecordRepoTransBlockDao>('IMissingRecordRepoTransBlockDao');
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token<IRecordUpdateStageDao>('IRecordUpdateStageDao');
export const REPO_TRANS_BLOCK_DAO
	                                                = movingWalkway.token<IRepositoryTransactionBlockDao>('IRepositoryTransactionBlockDao');
export const REPO_TRANS_BLOCK_DUO
	                                                = movingWalkway.token<IRepositoryTransactionBlockDuo>('IRepositoryTransactionBlockDuo');
export const REPO_TRANS_HISTORY_UPDATE_STAGE_DAO
	                                                = movingWalkway.token<IRepositoryTransactionHistoryUpdateStageDao>('IRepositoryTransactionHistoryUpdateStageDao');
export const REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO
	                                                = movingWalkway.token<IRepoTransBlockResponseStageDao>('IRepoTransBlockResponseStageDao');
export const SHARING_MESSAGE_DAO                  = movingWalkway.token<ISharingMessageDao>('ISharingMessageDao');
export const SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO = movingWalkway.token<ISharingMessageRepoTransBlockDao>('ISharingMessageRepoTransBlockDao');
// export const SharingMessageResponseStageDaoToken
// 	= movingWalkway.token<ISharingMessageResponseStageDao>('ISharingMessageResponseStageDao');
export const REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO
	                                             = movingWalkway.token<IRepoTransBlockSchemaToChangeDao>('IRepoTransBlockSchemaToChangeDao');
export const SHARING_NODE_DAO                  = movingWalkway.token<ISharingNodeDao>('ISharingNodeDao');
export const SHARING_NODE_TERMINAL_DAO         = movingWalkway.token<ISharingNodeTerminalDao>('ISharingNodeTerminalDao');
export const SHARING_NODE_REPOSITORY_DAO       = movingWalkway.token<ISharingNodeRepositoryDao>('ISharingNodeRepositoryDao');
export const SHARING_NODE_REPO_TRANS_BLOCK_DAO = movingWalkway.token<ISharingNodeRepoTransBlockDao>('ISharingNodeRepoTransBlockDao');
export const SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO
	                                             = movingWalkway.token<ISharingNodeRepoTransBlockStageDao>('ISharingNodeRepoTransBlockStageDao');
export const SYNC_CONFLICT_DAO
	                                             = movingWalkway.token<ISynchronizationConflictDao>('ISynchronizationConflictDao');
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO
	                                             = movingWalkway.token<ISynchronizationConflictPendingNotificationDao>('ISynchronizationConflictPendingNotificationDao');
export const SYNC_CONFLICT_VALUES_DAO
	= movingWalkway.token<ISynchronizationConflictValuesDao>();
