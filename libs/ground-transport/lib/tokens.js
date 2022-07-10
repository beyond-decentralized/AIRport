import { lib } from '@airport/direction-indicator';
import { SyncInActorChecker } from './synchronization/in/checker/SyncInActorChecker';
import { SyncInChecker } from './synchronization/in/checker/SyncInChecker';
import { SyncInDataChecker } from './synchronization/in/checker/SyncInDataChecker';
import { SyncInRepositoryChecker } from './synchronization/in/checker/SyncInRepositoryChecker';
import { SyncInApplicationChecker } from './synchronization/in/checker/SyncInApplicationChecker';
import { SyncInApplicationVersionChecker } from './synchronization/in/checker/SyncInApplicationVersionChecker';
import { SyncInTerminalChecker } from './synchronization/in/checker/SyncInTerminalChecker';
import { SyncInUserAccountChecker } from './synchronization/in/checker/SyncInUserAccountChecker';
import { Stage1SyncedInDataProcessor } from './synchronization/in/Stage1SyncedInDataProcessor';
import { Stage2SyncedInDataProcessor } from './synchronization/in/Stage2SyncedInDataProcessor';
import { SynchronizationInManager } from './synchronization/in/SynchronizationInManager';
import { SyncInUtils } from './synchronization/in/SyncInUtils';
import { TwoStageSyncedInDataProcessor } from './synchronization/in/TwoStageSyncedInDataProcessor';
import { SynchronizationOutManager } from './synchronization/out/SynchronizationOutManager';
import { SynchronizationAdapterLoader } from './adapters/SynchronizationAdapterLoader';
import { SyncOutDataSerializer } from './synchronization/out/converter/SyncOutDataSerializer';
import { AIRPORT_DATABASE, DATABASE_FACADE, UTILS } from '@airport/air-traffic-control';
import { TERMINAL_STORE, TRANSACTION_MANAGER } from '@airport/terminal-map';
import { TERMINAL_DAO, USER_ACCOUNT_DAO } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import { APPLICATION_DAO, APPLICATION_VERSION_DAO, DOMAIN_DAO } from '@airport/airspace';
import { ACTOR_DAO, REPOSITORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DUO } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { RECORD_UPDATE_STAGE_DAO, SYNCHRONIZATION_CONFLICT_DAO, SYNCHRONIZATION_CONFLICT_VALUES_DAO } from '@airport/layover';
import { DebugSynchronizationAdapter } from './adapters/DebugSynchronizationAdapter';
import { NONHUB_CLIENT } from '@airport/nonhub-client';
import { SEQUENCE_GENERATOR } from '@airport/ground-control';
const groundTransport = lib('ground-transport');
export const STAGE1_SYNCED_IN_DATA_PROCESSOR = groundTransport.token({
    class: Stage1SyncedInDataProcessor,
    interface: 'IStage1SyncedInDataProcessor',
    token: 'STAGE1_SYNCED_IN_DATA_PROCESSOR'
});
export const STAGE2_SYNCED_IN_DATA_PROCESSOR = groundTransport.token({
    class: Stage2SyncedInDataProcessor,
    interface: 'IStage2SyncedInDataProcessor',
    token: 'STAGE2_SYNCED_IN_DATA_PROCESSOR'
});
export const SYNC_IN_ACTOR_CHECKER = groundTransport.token({
    class: SyncInActorChecker,
    interface: 'ISyncInActorChecker',
    token: 'SYNC_IN_ACTOR_CHECKER'
});
export const SYNC_IN_CHECKER = groundTransport.token({
    class: SyncInChecker,
    interface: 'ISyncInChecker',
    token: 'SYNC_IN_CHECKER'
});
export const SYNC_IN_DATA_CHECKER = groundTransport.token({
    class: SyncInDataChecker,
    interface: 'ISyncInDataChecker',
    token: 'SYNC_IN_DATA_CHECKER'
});
export const SYNC_IN_TERMINAL_CHECKER = groundTransport.token({
    class: SyncInTerminalChecker,
    interface: 'ISyncInTerminalChecker',
    token: 'SYNC_IN_TERMINAL_CHECKER'
});
export const SYNC_IN_REPOSITORY_CHECKER = groundTransport.token({
    class: SyncInRepositoryChecker,
    interface: 'ISyncInRepositoryChecker',
    token: 'SYNC_IN_REPOSITORY_CHECKER'
});
export const SYNC_IN_APPLICATION_CHECKER = groundTransport.token({
    class: SyncInApplicationChecker,
    interface: 'ISyncInApplicationChecker',
    token: 'SYNC_IN_APPLICATION_CHECKER'
});
export const SYNC_IN_APPLICATION_VERSION_CHECKER = groundTransport.token({
    class: SyncInApplicationVersionChecker,
    interface: 'ISyncInApplicationVersionChecker',
    token: 'SYNC_IN_APPLICATION_VERSION_CHECKER'
});
export const SYNC_IN_USER_ACCOUNT_CHECKER = groundTransport.token({
    class: SyncInUserAccountChecker,
    interface: 'ISyncInUserAccountChecker',
    token: 'SYNC_IN_USER_ACCOUNT_CHECKER'
});
export const SYNC_IN_UTILS = groundTransport.token({
    class: SyncInUtils,
    interface: 'ISyncInUtils',
    token: 'SYNC_IN_UTILS'
});
export const SYNCHRONIZATION_IN_MANAGER = groundTransport.token({
    class: SynchronizationInManager,
    interface: 'ISynchronizationInManager',
    token: 'SYNCHRONIZATION_IN_MANAGER'
});
export const SYNCHRONIZATION_OUT_MANAGER = groundTransport.token({
    class: SynchronizationOutManager,
    interface: 'ISynchronizationOutManager',
    token: 'SYNCHRONIZATION_OUT_MANAGER'
});
export const SYNC_OUT_DATA_SERIALIZER = groundTransport.token({
    class: SyncOutDataSerializer,
    interface: 'ISyncOutDataSerializer',
    token: 'SYNC_OUT_DATA_SERIALIZER'
});
export const TWO_STAGE_SYNCED_IN_DATA_PROCESSOR = groundTransport.token({
    class: TwoStageSyncedInDataProcessor,
    interface: 'ITwoStageSyncedInDataProcessor',
    token: 'TWO_STAGE_SYNCED_IN_DATA_PROCESSOR'
});
export const DEBUG_SYNCHRONIZATION_ADAPTER = groundTransport.token({
    class: DebugSynchronizationAdapter,
    interface: 'ISynchronizationAdapter',
    token: 'DEBUG_SYNCHRONIZATION_ADAPTER'
});
export const SYNCHRONIZATION_ADAPTER_LOADER = groundTransport.token({
    class: SynchronizationAdapterLoader,
    interface: 'ISynchronizationAdapterLoader',
    token: 'SYNCHRONIZATION_ADAPTER_LOADER'
});
DEBUG_SYNCHRONIZATION_ADAPTER.setDependencies({
    nonhubClient: NONHUB_CLIENT
});
STAGE1_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    actorDao: ACTOR_DAO,
    airportDatabase: AIRPORT_DATABASE,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR,
    syncInUtils: SYNC_IN_UTILS
});
STAGE2_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    databaseFacade: DATABASE_FACADE,
    recordUpdateStageDao: RECORD_UPDATE_STAGE_DAO,
    utils: UTILS
});
SYNC_IN_ACTOR_CHECKER.setDependencies({
    actorDao: ACTOR_DAO,
});
SYNC_IN_APPLICATION_CHECKER.setDependencies({
    applicationDao: APPLICATION_DAO,
    domainDao: DOMAIN_DAO
});
SYNC_IN_APPLICATION_VERSION_CHECKER.setDependencies({
    applicationVersionDao: APPLICATION_VERSION_DAO
});
SYNC_IN_CHECKER.setDependencies({
    syncInActorChecker: SYNC_IN_ACTOR_CHECKER,
    syncInApplicationChecker: SYNC_IN_APPLICATION_CHECKER,
    syncInApplicationVersionChecker: SYNC_IN_APPLICATION_VERSION_CHECKER,
    syncInDataChecker: SYNC_IN_DATA_CHECKER,
    syncInRepositoryChecker: SYNC_IN_REPOSITORY_CHECKER,
    syncInTerminalChecker: SYNC_IN_TERMINAL_CHECKER,
    syncInUserAccountChecker: SYNC_IN_USER_ACCOUNT_CHECKER
});
SYNC_IN_DATA_CHECKER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
});
SYNC_IN_REPOSITORY_CHECKER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
});
SYNC_IN_TERMINAL_CHECKER.setDependencies({
    terminalDao: TERMINAL_DAO
});
SYNC_IN_USER_ACCOUNT_CHECKER.setDependencies({
    userAccountDao: USER_ACCOUNT_DAO
});
SYNC_OUT_DATA_SERIALIZER.setDependencies({
    actorDao: ACTOR_DAO,
    repositoryDao: REPOSITORY_DAO,
});
SYNCHRONIZATION_ADAPTER_LOADER.setDependencies({
    debugSynchronizationAdapter: DEBUG_SYNCHRONIZATION_ADAPTER
});
SYNCHRONIZATION_IN_MANAGER.setDependencies({
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
    syncInChecker: SYNC_IN_CHECKER,
    transactionManager: TRANSACTION_MANAGER,
    twoStageSyncedInDataProcessor: TWO_STAGE_SYNCED_IN_DATA_PROCESSOR
});
SYNCHRONIZATION_OUT_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
    synchronizationAdapterLoader: SYNCHRONIZATION_ADAPTER_LOADER,
    syncOutDataSerializer: SYNC_OUT_DATA_SERIALIZER
});
TWO_STAGE_SYNCED_IN_DATA_PROCESSOR.setDependencies({
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    stage1SyncedInDataProcessor: STAGE1_SYNCED_IN_DATA_PROCESSOR,
    stage2SyncedInDataProcessor: STAGE2_SYNCED_IN_DATA_PROCESSOR,
    synchronizationConflictDao: SYNCHRONIZATION_CONFLICT_DAO,
    synchronizationConflictValuesDao: SYNCHRONIZATION_CONFLICT_VALUES_DAO
});
//# sourceMappingURL=tokens.js.map