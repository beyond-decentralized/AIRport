import { lib } from '@airport/direction-indicator'
import { SyncInActorChecker } from './synchronization/in/checker/SyncInActorChecker'
import { SyncInChecker } from './synchronization/in/checker/SyncInChecker'
import { SyncInDataChecker } from './synchronization/in/checker/SyncInDataChecker'
import { SyncInRepositoryChecker } from './synchronization/in/checker/SyncInRepositoryChecker'
import { SyncInApplicationChecker } from './synchronization/in/checker/SyncInApplicationChecker'
import { SyncInApplicationVersionChecker } from './synchronization/in/checker/SyncInApplicationVersionChecker'
import { SyncInTerminalChecker } from './synchronization/in/checker/SyncInTerminalChecker'
import { SyncInUserAccountChecker } from './synchronization/in/checker/SyncInUserAccountChecker'
import { Stage1SyncedInDataProcessor } from './synchronization/in/Stage1SyncedInDataProcessor'
import { Stage2SyncedInDataProcessor } from './synchronization/in/Stage2SyncedInDataProcessor'
import { SynchronizationInManager } from './synchronization/in/SynchronizationInManager'
import { SyncInUtils } from './synchronization/in/SyncInUtils'
import { TwoStageSyncedInDataProcessor } from './synchronization/in/TwoStageSyncedInDataProcessor'
import { SynchronizationOutManager } from './synchronization/out/SynchronizationOutManager'
import { SynchronizationAdapterLoader } from './adapters/SynchronizationAdapterLoader'
import { SyncOutDataSerializer } from './synchronization/out/converter/SyncOutDataSerializer'
import {
    AIRPORT_DATABASE,
    UTILS
} from '@airport/air-traffic-control'
import {
    TERMINAL_STORE,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import {
    TerminalDao,
    UserAccountDao
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
    ApplicationDao,
    ApplicationVersionDao,
    DomainDao
} from '@airport/airspace/dist/app/bundle'
import {
    ActorDao,
    RepositoryDao, RepositoryTransactionHistoryDao, RepositoryTransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import {
    RecordUpdateStageDao,
    SynchronizationConflictDao, SynchronizationConflictValuesDao
} from '@airport/layover'
import { DebugSynchronizationAdapter } from './adapters/DebugSynchronizationAdapter'
import { SEQUENCE_GENERATOR } from '@airport/ground-control'
import { DATABASE_FACADE } from '@airport/tarmaq-dao'
import { CLIENT } from '@airway/client'

const groundTransport = lib('ground-transport')

groundTransport.register(
    Stage1SyncedInDataProcessor, Stage2SyncedInDataProcessor, SyncInActorChecker,
    SyncInChecker, SyncInDataChecker, SyncInTerminalChecker,
    SyncInRepositoryChecker, SyncInApplicationChecker, SyncInApplicationVersionChecker,
    SyncInUserAccountChecker, SyncInUtils, SynchronizationInManager,
    SynchronizationOutManager, SyncOutDataSerializer, TwoStageSyncedInDataProcessor,
    DebugSynchronizationAdapter, SynchronizationAdapterLoader
)
groundTransport.setDependencies(DebugSynchronizationAdapter, {
    client: CLIENT
})
groundTransport.setDependencies(Stage1SyncedInDataProcessor, {
    actorDao: ActorDao,
    airportDatabase: AIRPORT_DATABASE,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
    syncInUtils: SyncInUtils
})
groundTransport.setDependencies(Stage2SyncedInDataProcessor, {
    airportDatabase: AIRPORT_DATABASE,
    databaseFacade: DATABASE_FACADE,
    recordUpdateStageDao: RecordUpdateStageDao,
    utils: UTILS
})

groundTransport.setDependencies(SyncInActorChecker, {
    actorDao: ActorDao,
})

groundTransport.setDependencies(SyncInApplicationChecker, {
    applicationDao: ApplicationDao,
    domainDao: DomainDao
})

groundTransport.setDependencies(SyncInApplicationVersionChecker, {
    applicationVersionDao: ApplicationVersionDao
})

groundTransport.setDependencies(SyncInChecker, {
    syncInActorChecker: SyncInActorChecker,
    syncInApplicationChecker: SyncInApplicationChecker,
    syncInApplicationVersionChecker: SyncInApplicationVersionChecker,
    syncInDataChecker: SyncInDataChecker,
    syncInRepositoryChecker: SyncInRepositoryChecker,
    syncInTerminalChecker: SyncInTerminalChecker,
    syncInUserAccountChecker: SyncInUserAccountChecker
})

groundTransport.setDependencies(SyncInDataChecker, {
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
})

groundTransport.setDependencies(SyncInRepositoryChecker, {
    repositoryDao: RepositoryDao,
})

groundTransport.setDependencies(SyncInTerminalChecker, {
    terminalDao: TerminalDao
})

groundTransport.setDependencies(SyncInUserAccountChecker, {
    userAccountDao: UserAccountDao
})

groundTransport.setDependencies(SyncOutDataSerializer, {
    actorDao: ActorDao,
    repositoryDao: RepositoryDao,
})

groundTransport.setDependencies(SynchronizationAdapterLoader, {
    debugSynchronizationAdapter: DebugSynchronizationAdapter
})

groundTransport.setDependencies(SynchronizationInManager, {
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    syncInChecker: SyncInChecker,
    transactionManager: TRANSACTION_MANAGER,
    twoStageSyncedInDataProcessor: TwoStageSyncedInDataProcessor
})

groundTransport.setDependencies(SynchronizationOutManager, {
    repositoryDao: RepositoryDao,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    syncOutDataSerializer: SyncOutDataSerializer
})

groundTransport.setDependencies(TwoStageSyncedInDataProcessor, {
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    stage1SyncedInDataProcessor: Stage1SyncedInDataProcessor,
    stage2SyncedInDataProcessor: Stage2SyncedInDataProcessor,
    synchronizationConflictDao: SynchronizationConflictDao,
    synchronizationConflictValuesDao: SynchronizationConflictValuesDao
})
