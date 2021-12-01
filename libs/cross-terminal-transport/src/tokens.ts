import { system } from '@airport/di'
import { ISyncInActorChecker } from './synchronization/in/checker/SyncInActorChecker'
import { ISyncInChecker } from './synchronization/in/checker/SyncInChecker'
import { ISyncInConsistencyChecker } from './synchronization/in/checker/SyncInConsistencyChecker'
import { ISyncInDataChecker } from './synchronization/in/checker/SyncInDataChecker'
import { ISyncInRepositoryChecker } from './synchronization/in/checker/SyncInRepositoryChecker'
import { ISyncInApplicationChecker } from './synchronization/in/checker/SyncInApplicationChecker'
import { ISyncInTerminalChecker } from './synchronization/in/checker/SyncInTerminalChecker'
import { ISyncInUserChecker } from './synchronization/in/checker/SyncInUserChecker'
import { IMissingRecordCreator } from './synchronization/in/creator/MissingRecordCreator'
import { ISyncInRepositoryTransactionBlockCreator } from './synchronization/in/creator/SyncInRepositoryTransactionBlockCreator'
import { ISyncInSharingMessageCreator } from './synchronization/in/creator/SyncInSharingMessageCreator'
import { IStage1SyncedInDataProcessor } from './synchronization/in/Stage1SyncedInDataProcessor'
import { IStage2SyncedInDataProcessor } from './synchronization/in/Stage2SyncedInDataProcessor'
import { ISynchronizationInManager } from './synchronization/in/SynchronizationInManager'
import { ISyncInUtils } from './synchronization/in/SyncInUtils'
import { ISyncLogMessageProcessor } from './synchronization/in/SyncLogMessageProcessor'
import { ITwoStageSyncedInDataProcessor } from './synchronization/in/TwoStageSyncedInDataProcessor'
import { ISynchronizationOutCoordinator } from './synchronization/out/SynchronizationOutCoordinator'
import { ISynchronizationOutManager } from './synchronization/out/SynchronizationOutManager'
import { ISyncOutMessageSender } from './synchronization/out/SyncOutMessageSender'
import { ISyncOutRepositoryTransactionBlockCreator } from './synchronization/out/SyncOutRepositoryTransactionBlockCreator'
import { ISyncOutSerializer } from './synchronization/out/SyncOutSerializer'
import { ISyncNodeManager } from './synchronization/SyncNodeManager'

const groundTransport = system('airport').lib('ground-transport')

// FIXME: tokens names do not match the interface name
export const MISSING_RECORD_CREATOR = groundTransport.token<IMissingRecordCreator>('IMissingRecordCreator')
export const STAGE1_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage1SyncedInDataProcessor>('IStage1SyncedInDataProcessor')
export const STAGE2_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage2SyncedInDataProcessor>('IStage2SyncedInDataProcessor')
export const SYNC_IN_ACTOR_CHECKER = groundTransport.token<ISyncInActorChecker>('ISyncInActorChecker')
export const SYNC_IN_CHECKER = groundTransport.token<ISyncInChecker>('ISyncInChecker')
export const SYNC_IN_CONSISTENCY_CHECKER = groundTransport.token<ISyncInConsistencyChecker>('ISyncInConsistencyChecker')
export const SYNC_IN_DATA_CHECKER = groundTransport.token<ISyncInDataChecker>('ISyncInDataChecker')
export const SYNC_IN_TERMINAL_CHECKER = groundTransport.token<ISyncInTerminalChecker>('ISyncInTerminalChecker')
export const SYNC_IN_REPO_CHECKER = groundTransport.token<ISyncInRepositoryChecker>('ISyncInRepositoryChecker')
export const SYNC_IN_REPO_TRANS_BLOCK_CREATOR
    = groundTransport.token<ISyncInRepositoryTransactionBlockCreator>('ISyncInRepositoryTransactionBlockCreator')
export const SYNC_IN_SCHEMA_CHECKER = groundTransport.token<ISyncInApplicationChecker>('ISyncInApplicationChecker')
export const SYNC_IN_SHARING_MESSAGE_CREATOR = groundTransport.token<ISyncInSharingMessageCreator>('ISyncInSharingMessageCreator')
export const SYNC_IN_USER_CHECKER = groundTransport.token<ISyncInUserChecker>('ISyncInUserChecker')
export const SYNC_IN_UTILS = groundTransport.token<ISyncInUtils>('ISyncInUtils')
export const SYNC_LOG_MESSAGE_PROCESSOR = groundTransport.token<ISyncLogMessageProcessor>('ISyncLogMessageProcessor')
export const SYNC_NODE_MANAGER = groundTransport.token<ISyncNodeManager>('ISyncNodeManager')
export const SYNC_IN_MANAGER = groundTransport.token<ISynchronizationInManager>('ISynchronizationInManager')
export const SYNCHRONIZATION_OUT_COORDINATOR = groundTransport.token<ISynchronizationOutCoordinator>('ISynchronizationOutCoordinator')
export const SYNC_OUT_MANAGER = groundTransport.token<ISynchronizationOutManager>('ISynchronizationOutManager')
export const SYNC_OUT_MSG_SENDER = groundTransport.token<ISyncOutMessageSender>('ISyncOutMessageSender')
export const SYNC_OUT_REPO_TRANS_BLOCK_CREATOR
    = groundTransport.token<ISyncOutRepositoryTransactionBlockCreator>('ISyncOutRepositoryTransactionBlockCreator')
export const SYNC_OUT_SERIALIZER = groundTransport.token<ISyncOutSerializer>('ISyncOutSerializer')
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<ITwoStageSyncedInDataProcessor>('ITwoStageSyncedInDataProcessor')


