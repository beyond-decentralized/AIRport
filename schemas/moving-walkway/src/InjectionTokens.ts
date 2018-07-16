import {Token}                                          from "typedi/Token";
import {ISynchronizationConflictDao}                    from "./dao/conflict/SynchronizationConflictDao";
import {ISynchronizationConflictPendingNotificationDao} from "./dao/conflict/SynchronizationConflictPendingNotificationDao";
import {ISynchronizationConflictValuesDao}              from "./dao/conflict/SynchronizationConflictValuesDao";
import {IMissingRecordDao}                              from "./dao/missingRecord/MissingRecordDao";
import {IMissingRecordRepoTransBlockDao}                from "./dao/missingRecord/MissingRecordRepoTransBlockDao";
import {IRecordUpdateStageDao}                          from "./dao/RecordUpdateStageDao";
import {IRepositoryTransactionBlockDao}                 from "./dao/repositoryTransactionBlock/RepositoryTransactionBlockDao";
import {IRepositoryTransactionHistoryUpdateStageDao}    from "./dao/repositoryTransactionBlock/RepositoryTransactionHistoryUpdateStageDao";
import {IRepoTransBlockResponseStageDao}                from "./dao/repositoryTransactionBlock/RepoTransBlockResponseStageDao";
// import {ISharingMessageResponseStageDao}                from
// "./dao/sharingMessage/SharingMessageResponseStageDao";
import {IRepoTransBlockSchemasToChangeDao}              from "./dao/repositoryTransactionBlock/RepoTransBlockSchemasToChangeDao";
import {ISharingMessageDao}                             from "./dao/sharingMessage/SharingMessageDao";
import {ISharingMessageRepoTransBlockDao}               from "./dao/sharingMessage/SharingMessageRepoTransBlockDao";
import {ISharingNodeDao}                                from "./dao/sharingNode/SharingNodeDao";
import {ISharingNodeDatabaseDao}                        from "./dao/sharingNode/SharingNodeDatabaseDao";
import {ISharingNodeRepositoryDao}                      from "./dao/sharingNode/SharingNodeRepositoryDao";
import {ISharingNodeRepoTransBlockDao}                  from "./dao/sharingNode/SharingNodeRepoTransBlockDao";
import {ISharingNodeRepoTransBlockStageDao}             from "./dao/sharingNode/SharingNodeRepoTransBlockStageDao";
import {IRepositoryTransactionBlockDmo}                 from "./dmo/repositoryTransactionBlock/RepositoryTransactionBlockDmo";

export const MissingRecordDaoToken = new Token<IMissingRecordDao>();
export const MissingRecordRepoTransBlockDaoToken
	= new Token<IMissingRecordRepoTransBlockDao>();
export const RecordUpdateStageDaoToken = new Token<IRecordUpdateStageDao>();
export const RepositoryTransactionBlockDaoToken
	= new Token<IRepositoryTransactionBlockDao>();
export const RepositoryTransactionBlockDmoToken
	= new Token<IRepositoryTransactionBlockDmo>();
export const RepositoryTransactionHistoryUpdateStageDaoToken
	= new Token<IRepositoryTransactionHistoryUpdateStageDao>();
export const RepoTransBlockResponseStageDaoToken
	= new Token<IRepoTransBlockResponseStageDao>();
export const SharingMessageDaoToken = new Token<ISharingMessageDao>();
export const SharingMessageRepoTransBlockDaoToken = new Token<ISharingMessageRepoTransBlockDao>();
// export const SharingMessageResponseStageDaoToken
// 	= new Token<ISharingMessageResponseStageDao>();
export const RepoTransBlockSchemasToChangeDaoToken
	= new Token<IRepoTransBlockSchemasToChangeDao>();
export const SharingNodeDaoToken = new Token<ISharingNodeDao>();
export const SharingNodeDatabaseDaoToken = new Token<ISharingNodeDatabaseDao>();
export const SharingNodeRepositoryDaoToken = new Token<ISharingNodeRepositoryDao>();
export const SharingNodeRepoTransBlockDaoToken = new Token<ISharingNodeRepoTransBlockDao>();
export const SharingNodeRepoTransBlockStageDaoToken
	= new Token<ISharingNodeRepoTransBlockStageDao>();
export const SynchronizationConflictDaoToken
	= new Token<ISynchronizationConflictDao>();
export const SynchronizationConflictPendingNotificationDaoToken
	= new Token<ISynchronizationConflictPendingNotificationDao>();
export const SynchronizationConflictValuesDaoToken
	= new Token<ISynchronizationConflictValuesDao>();
