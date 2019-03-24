import {diToken}                                   from '@airport/di'
import {IStoreDriver}                              from '@airport/ground-control'
import {ISharingNodeEndpoint}                      from './synchronization/connect/SharingNodeEndpoint'
import {ISyncInActorChecker}                       from './synchronization/in/checker/SyncInActorChecker'
import {ISyncInChecker}                            from './synchronization/in/checker/SyncInChecker'
import {ISyncInConsistencyChecker}                 from './synchronization/in/checker/SyncInConsistencyChecker'
import {ISyncInDataChecker}                        from './synchronization/in/checker/SyncInDataChecker'
import {ISyncInRepositoryChecker}                  from './synchronization/in/checker/SyncInRepositoryChecker'
import {ISyncInSchemaChecker}                      from './synchronization/in/checker/SyncInSchemaChecker'
import {ISyncInTerminalChecker}                    from './synchronization/in/checker/SyncInTerminalChecker'
import {ISyncInUserChecker}                        from './synchronization/in/checker/SyncInUserChecker'
import {IMissingRecordCreator}                     from './synchronization/in/creator/MissingRecordCreator'
import {ISyncInRepositoryTransactionBlockCreator}  from './synchronization/in/creator/SyncInRepositoryTransactionBlockCreator'
import {ISyncInSharingMessageCreator}              from './synchronization/in/creator/SyncInSharingMessageCreator'
import {IStage1SyncedInDataProcessor}              from './synchronization/in/Stage1SyncedInDataProcessor'
import {IStage2SyncedInDataProcessor}              from './synchronization/in/Stage2SyncedInDataProcessor'
import {ISynchronizationInManager}                 from './synchronization/in/SynchronizationInManager'
import {ISyncInUtils}                              from './synchronization/in/SyncInUtils'
import {ISyncLogMessageProcessor}                  from './synchronization/in/SyncLogMessageProcessor'
import {ITwoStageSyncedInDataProcessor}            from './synchronization/in/TwoStageSyncedInDataProcessor'
import {ISynchronizationOutCoordinator}            from './synchronization/out/SynchronizationOutCoordinator'
import {ISynchronizationOutManager}                from './synchronization/out/SynchronizationOutManager'
import {ISyncOutMessageSender}                     from './synchronization/out/SyncOutMessageSender'
import {ISyncOutRepositoryTransactionBlockCreator} from './synchronization/out/SyncOutRepositoryTransactionBlockCreator'
import {ISyncOutSerializer}                        from './synchronization/out/SyncOutSerializer'
import {ISyncNodeManager}                          from './synchronization/SyncNodeManager'

export const DIRECT_SHARING_NODE_ENDPOINT       = diToken<ISharingNodeEndpoint>()
export const HTTP_SHARING_NODE_ENDPOINT         = diToken<ISharingNodeEndpoint>()
export const MISSING_RECORD_CREATOR             = diToken<IMissingRecordCreator>()
export const STAGE1_SYNCED_IN_DATA_PROCESSOR    = diToken<IStage1SyncedInDataProcessor>()
export const STAGE2_SYNCED_IN_DATA_PROCESSOR    = diToken<IStage2SyncedInDataProcessor>()
export const STORE_DRIVER                       = diToken<IStoreDriver>()
export const SYNC_IN_ACTOR_CHECKER              = diToken<ISyncInActorChecker>()
export const SYNC_IN_CHECKER                    = diToken<ISyncInChecker>()
export const SYNC_IN_CONSISTENCY_CHECKER        = diToken<ISyncInConsistencyChecker>()
export const SYNC_IN_DATA_CHECKER               = diToken<ISyncInDataChecker>()
export const SYNC_IN_TERMINAL_CHECKER           = diToken<ISyncInTerminalChecker>()
export const SYNC_IN_REPO_CHECKER               = diToken<ISyncInRepositoryChecker>()
export const SYNC_IN_REPO_TRANS_BLOCK_CREATOR
                                                = diToken<ISyncInRepositoryTransactionBlockCreator>()
export const SYNC_IN_SCHEMA_CHECKER             = diToken<ISyncInSchemaChecker>()
export const SYNC_IN_SHARING_MESSAGE_CREATOR    = diToken<ISyncInSharingMessageCreator>()
export const SYNC_IN_USER_CHECKER               = diToken<ISyncInUserChecker>()
export const SYNC_IN_UTILS                      = diToken<ISyncInUtils>()
export const SYNC_LOG_MESSAGE_PROCESSOR         = diToken<ISyncLogMessageProcessor>()
export const SYNC_NODE_MANAGER                  = diToken<ISyncNodeManager>()
export const SYNC_IN_MANAGER                    = diToken<ISynchronizationInManager>()
export const SYNC_OUT_COORDINATOR               = diToken<ISynchronizationOutCoordinator>()
export const SYNC_OUT_MANAGER                   = diToken<ISynchronizationOutManager>()
export const SYNC_OUT_MSG_SENDER                = diToken<ISyncOutMessageSender>()
export const SYNC_OUT_REPO_TRANS_BLOCK_CREATOR
                                                = diToken<ISyncOutRepositoryTransactionBlockCreator>()
export const SYNC_OUT_SERIALIZER                = diToken<ISyncOutSerializer>()
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = diToken<ITwoStageSyncedInDataProcessor>()


