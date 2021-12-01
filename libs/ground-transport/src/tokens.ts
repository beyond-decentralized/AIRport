import { lib } from '@airport/di'
import { ISyncInActorChecker } from './synchronization/in/checker/SyncInActorChecker'
import { ISyncInChecker } from './synchronization/in/checker/SyncInChecker'
import { ISyncInDataChecker } from './synchronization/in/checker/SyncInDataChecker'
import { ISyncInRepositoryChecker } from './synchronization/in/checker/SyncInRepositoryChecker'
import { ISyncInApplicationChecker } from './synchronization/in/checker/SyncInApplicationChecker'
import { ISyncInApplicationVersionChecker } from './synchronization/in/checker/SyncInApplicationVersionChecker'
import { ISyncInTerminalChecker } from './synchronization/in/checker/SyncInTerminalChecker'
import { ISyncInUserChecker } from './synchronization/in/checker/SyncInUserChecker'
import { IStage1SyncedInDataProcessor } from './synchronization/in/Stage1SyncedInDataProcessor'
import { IStage2SyncedInDataProcessor } from './synchronization/in/Stage2SyncedInDataProcessor'
import { ISynchronizationInManager } from './synchronization/in/SynchronizationInManager'
import { ISyncInUtils } from './synchronization/in/SyncInUtils'
import { ITwoStageSyncedInDataProcessor } from './synchronization/in/TwoStageSyncedInDataProcessor'
import { ISynchronizationOutManager } from './synchronization/out/SynchronizationOutManager'
import { ISynchronizationAdapter } from './adapters/ISynchronizationAdapter'
import { ISynchronizationAdapterLoader } from './adapters/SynchronizationAdapterLoader'
import { ISyncOutDataSerializer } from './synchronization/out/converter/SyncOutDataSerializer'

const groundTransport = lib('ground-transport')

export const STAGE1_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage1SyncedInDataProcessor>('IStage1SyncedInDataProcessor')
export const STAGE2_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage2SyncedInDataProcessor>('IStage2SyncedInDataProcessor')
export const SYNC_IN_ACTOR_CHECKER = groundTransport.token<ISyncInActorChecker>('ISyncInActorChecker')
export const SYNC_IN_CHECKER = groundTransport.token<ISyncInChecker>('ISyncInChecker')
export const SYNC_IN_DATA_CHECKER = groundTransport.token<ISyncInDataChecker>('ISyncInDataChecker')
export const SYNC_IN_TERMINAL_CHECKER = groundTransport.token<ISyncInTerminalChecker>('ISyncInTerminalChecker')
export const SYNC_IN_REPOSITORY_CHECKER = groundTransport.token<ISyncInRepositoryChecker>('ISyncInRepositoryChecker')
export const SYNC_IN_APPLICATION_CHECKER = groundTransport.token<ISyncInApplicationChecker>('ISyncInApplicationChecker')
export const SYNC_IN_APPLICATION_VERSION_CHECKER = groundTransport.token<ISyncInApplicationVersionChecker>('ISyncInApplicationVersionChecker')
export const SYNC_IN_USER_CHECKER = groundTransport.token<ISyncInUserChecker>('ISyncInUserChecker')
export const SYNC_IN_UTILS = groundTransport.token<ISyncInUtils>('ISyncInUtils')
export const SYNCHRONIZATION_IN_MANAGER = groundTransport.token<ISynchronizationInManager>('ISynchronizationInManager')
export const SYNCHRONIZATION_OUT_MANAGER = groundTransport.token<ISynchronizationOutManager>('ISynchronizationOutManager')
export const SYNC_OUT_DATA_SERIALIZER = groundTransport.token<ISyncOutDataSerializer>('ISyncOutDataSerializer')
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<ITwoStageSyncedInDataProcessor>('ITwoStageSyncedInDataProcessor')


export const DEBUG_SYNCHRONIZATION_ADAPTER = groundTransport.token<ISynchronizationAdapter>('DebugSynchronizationAdapter')
export const SYNCHRONIZATION_ADAPTER_LOADER = groundTransport.token<ISynchronizationAdapterLoader>('SYNCHRONIZATION_ADAPTER_LOADER')
