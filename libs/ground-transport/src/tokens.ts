import {system}                                   from '@airport/di'
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

const groundTransport = system('airport').lib('ground-transport')

export const DIRECT_SHARING_NODE_ENDPOINT       = groundTransport.token<ISharingNodeEndpoint>()
export const HTTP_SHARING_NODE_ENDPOINT         = groundTransport.token<ISharingNodeEndpoint>()
export const MISSING_RECORD_CREATOR             = groundTransport.token<IMissingRecordCreator>()
export const STAGE1_SYNCED_IN_DATA_PROCESSOR    = groundTransport.token<IStage1SyncedInDataProcessor>()
export const STAGE2_SYNCED_IN_DATA_PROCESSOR    = groundTransport.token<IStage2SyncedInDataProcessor>()
export const SYNC_IN_ACTOR_CHECKER              = groundTransport.token<ISyncInActorChecker>()
export const SYNC_IN_CHECKER                    = groundTransport.token<ISyncInChecker>()
export const SYNC_IN_CONSISTENCY_CHECKER        = groundTransport.token<ISyncInConsistencyChecker>()
export const SYNC_IN_DATA_CHECKER               = groundTransport.token<ISyncInDataChecker>()
export const SYNC_IN_TERMINAL_CHECKER           = groundTransport.token<ISyncInTerminalChecker>()
export const SYNC_IN_REPO_CHECKER               = groundTransport.token<ISyncInRepositoryChecker>()
export const SYNC_IN_REPO_TRANS_BLOCK_CREATOR
                                                = groundTransport.token<ISyncInRepositoryTransactionBlockCreator>()
export const SYNC_IN_SCHEMA_CHECKER             = groundTransport.token<ISyncInSchemaChecker>()
export const SYNC_IN_SHARING_MESSAGE_CREATOR    = groundTransport.token<ISyncInSharingMessageCreator>()
export const SYNC_IN_USER_CHECKER               = groundTransport.token<ISyncInUserChecker>()
export const SYNC_IN_UTILS                      = groundTransport.token<ISyncInUtils>()
export const SYNC_LOG_MESSAGE_PROCESSOR         = groundTransport.token<ISyncLogMessageProcessor>()
export const SYNC_NODE_MANAGER                  = groundTransport.token<ISyncNodeManager>()
export const SYNC_IN_MANAGER                    = groundTransport.token<ISynchronizationInManager>()
export const SYNC_OUT_COORDINATOR               = groundTransport.token<ISynchronizationOutCoordinator>()
export const SYNC_OUT_MANAGER                   = groundTransport.token<ISynchronizationOutManager>()
export const SYNC_OUT_MSG_SENDER                = groundTransport.token<ISyncOutMessageSender>()
export const SYNC_OUT_REPO_TRANS_BLOCK_CREATOR
                                                = groundTransport.token<ISyncOutRepositoryTransactionBlockCreator>()
export const SYNC_OUT_SERIALIZER                = groundTransport.token<ISyncOutSerializer>()
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<ITwoStageSyncedInDataProcessor>()


