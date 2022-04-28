import { lib } from '@airport/direction-indicator'
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
import { AIRPORT_DATABASE, DATABASE_FACADE } from '@airport/air-control'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { TERMINAL_STORE } from '@airport/terminal-map'
import { TERMINAL_DAO, USER_DAO } from '@airport/travel-document-checkpoint-internal'
import { APPLICATION_DAO, APPLICATION_VERSION_DAO, DOMAIN_DAO } from '@airport/airspace'
import { ACTOR_DAO, REPOSITORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DUO } from '@airport/holding-pattern'
import { RECORD_UPDATE_STAGE_DAO, SYNCHRONIZATION_CONFLICT_DAO, SYNCHRONIZATION_CONFLICT_VALUES_DAO } from '@airport/moving-walkway'

const groundTransport = lib('ground-transport')

export const STAGE1_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage1SyncedInDataProcessor>('STAGE1_SYNCED_IN_DATA_PROCESSOR')
export const STAGE2_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<IStage2SyncedInDataProcessor>('STAGE2_SYNCED_IN_DATA_PROCESSOR')
export const SYNC_IN_ACTOR_CHECKER = groundTransport.token<ISyncInActorChecker>('SYNC_IN_ACTOR_CHECKER')
export const SYNC_IN_CHECKER = groundTransport.token<ISyncInChecker>('SYNC_IN_CHECKER')
export const SYNC_IN_DATA_CHECKER = groundTransport.token<ISyncInDataChecker>('SYNC_IN_DATA_CHECKER')
export const SYNC_IN_TERMINAL_CHECKER = groundTransport.token<ISyncInTerminalChecker>('SYNC_IN_TERMINAL_CHECKER')
export const SYNC_IN_REPOSITORY_CHECKER = groundTransport.token<ISyncInRepositoryChecker>('SYNC_IN_REPOSITORY_CHECKER')
export const SYNC_IN_APPLICATION_CHECKER = groundTransport.token<ISyncInApplicationChecker>('SYNC_IN_APPLICATION_CHECKER')
export const SYNC_IN_APPLICATION_VERSION_CHECKER = groundTransport.token<ISyncInApplicationVersionChecker>('SYNC_IN_APPLICATION_VERSION_CHECKER')
export const SYNC_IN_USER_CHECKER = groundTransport.token<ISyncInUserChecker>('SYNC_IN_USER_CHECKER')
export const SYNC_IN_UTILS = groundTransport.token<ISyncInUtils>('SYNC_IN_UTILS')
export const SYNCHRONIZATION_IN_MANAGER = groundTransport.token<ISynchronizationInManager>('SYNCHRONIZATION_IN_MANAGER')
export const SYNCHRONIZATION_OUT_MANAGER = groundTransport.token<ISynchronizationOutManager>('SYNCHRONIZATION_OUT_MANAGER')
export const SYNC_OUT_DATA_SERIALIZER = groundTransport.token<ISyncOutDataSerializer>('SYNC_OUT_DATA_SERIALIZER')
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token<ITwoStageSyncedInDataProcessor>('TWO_STAGE_SYNCED_IN_DATA_PROCESSOR')
export const DEBUG_SYNCHRONIZATION_ADAPTER = groundTransport.token<ISynchronizationAdapter>('DEBUG_SYNCHRONIZATION_ADAPTER')
export const SYNCHRONIZATION_ADAPTER_LOADER = groundTransport.token<ISynchronizationAdapterLoader>('SYNCHRONIZATION_ADAPTER_LOADER')

STAGE1_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    actorDao: ACTOR_DAO,
    airportDatabase: AIRPORT_DATABASE,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR
})

STAGE2_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    databaseFacade: DATABASE_FACADE,
    recordUpdateStageDao: RECORD_UPDATE_STAGE_DAO
})

SYNC_IN_ACTOR_CHECKER.setDependencies({
    actorDao: ACTOR_DAO,
})

SYNC_IN_APPLICATION_CHECKER.setDependencies({
    applicationDao: APPLICATION_DAO,
    domainDao: DOMAIN_DAO
})

SYNC_IN_APPLICATION_VERSION_CHECKER.setDependencies({
    applicationVersionDao: APPLICATION_VERSION_DAO
})

SYNC_IN_DATA_CHECKER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
})

SYNC_IN_REPOSITORY_CHECKER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
})

SYNC_IN_TERMINAL_CHECKER.setDependencies({
    terminalDao: TERMINAL_DAO
})

SYNC_IN_USER_CHECKER.setDependencies({
    userDao: USER_DAO
})

SYNC_OUT_DATA_SERIALIZER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
})

SYNCHRONIZATION_IN_MANAGER.setDependencies({
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO
})

SYNCHRONIZATION_OUT_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
})

TWO_STAGE_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    synchronizationConflictDao: SYNCHRONIZATION_CONFLICT_DAO,
    synchronizationConflictValuesDao: SYNCHRONIZATION_CONFLICT_VALUES_DAO
})
