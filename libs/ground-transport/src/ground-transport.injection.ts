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
import { SyncOutDataPreparer } from './synchronization/out/converter/SyncOutDataPreparer'
import {
    AIRPORT_DATABASE,
    REPOSITORY_LOADER,
    SystemWideOperationIdUtils,
    Utils
} from '@airport/air-traffic-control'
import {
    APPLICATION_INITIALIZER,
    TerminalStore,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import {
    TerminalDao,
    UserAccountDao
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import {
    DdlApplicationDao,
    DdlRelationDao,
    DdlApplicationVersionDao
} from '@airport/airspace/dist/app/bundle'
import {
    ActorDao,
    RecordHistoryDuo,
    RepositoryBlockDao,
    RepositoryDao,
    RepositoryMemberAcceptanceDao,
    RepositoryMemberDao,
    RepositoryMemberInvitationDao,
    RepositoryReferenceDao,
    RepositoryTransactionHistoryDao,
    RepositoryTransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
// import {
//     RecordUpdateStageDao,
//     SynchronizationConflictDao,
//     SynchronizationConflictValuesDao
// } from '@airport/layover'
import { DebugSynchronizationAdapter } from './adapters/DebugSynchronizationAdapter'
import {
    APPLICATION_UTILS,
    AppTrackerUtils,
    DatastructureUtils,
    ApplicationNameUtils,
    Dictionary,
    KeyUtils,
    SEQUENCE_GENERATOR
} from '@airport/ground-control'
import { DATABASE_FACADE } from '@airport/tarmaq-dao'
import { Client } from '@airway/client'
import { BlockSigningManager } from '@airbridge/keyring/dist/app/bundle'
import { RepositoryReferenceCreator } from './synchronization/RepositoryReferenceCreator'

const groundTransport = lib('ground-transport')

groundTransport.register(
    RepositoryReferenceCreator,
    Stage1SyncedInDataProcessor, Stage2SyncedInDataProcessor, SyncInActorChecker,
    SyncInChecker, SyncInDataChecker, SyncInTerminalChecker,
    SyncInRepositoryChecker, SyncInApplicationChecker, SyncInApplicationVersionChecker,
    SyncInUserAccountChecker, SyncInUtils, SynchronizationInManager,
    SynchronizationOutManager, SyncOutDataPreparer, TwoStageSyncedInDataProcessor,
    DebugSynchronizationAdapter, SynchronizationAdapterLoader
)

groundTransport.setDependencies(DebugSynchronizationAdapter, {
    client: Client
})
groundTransport.setDependencies(RepositoryReferenceCreator, {
    datastructureUtils: DatastructureUtils,
    repositoryDao: RepositoryDao,
    repositoryReferenceDao: RepositoryReferenceDao
})
groundTransport.setDependencies(Stage1SyncedInDataProcessor, {
    actorDao: ActorDao,
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
    syncInUtils: SyncInUtils,
    systemWideOperationIdUtils: SystemWideOperationIdUtils,
})
groundTransport.setDependencies(Stage2SyncedInDataProcessor, {
    airportDatabase: AIRPORT_DATABASE,
    databaseFacade: DATABASE_FACADE,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    // recordUpdateStageDao: RecordUpdateStageDao,
    utils: Utils
})

groundTransport.setDependencies(SyncInActorChecker, {
    actorDao: ActorDao,
})

groundTransport.setDependencies(SyncInApplicationChecker, {
    applicationNameUtils: ApplicationNameUtils,
    ddlApplicationDao: DdlApplicationDao,
    syncInApplicationVersionChecker: SyncInApplicationVersionChecker,
    terminalStore: TerminalStore
})

groundTransport.setDependencies(SyncInApplicationVersionChecker, {
    ddlApplicationVersionDao: DdlApplicationVersionDao,
    applicationInitializer: APPLICATION_INITIALIZER
})

groundTransport.setDependencies(SyncInChecker, {
    datastructureUtils: DatastructureUtils,
    keyUtils: KeyUtils,
    syncInActorChecker: SyncInActorChecker,
    syncInApplicationChecker: SyncInApplicationChecker,
    syncInApplicationVersionChecker: SyncInApplicationVersionChecker,
    syncInDataChecker: SyncInDataChecker,
    syncInRepositoryChecker: SyncInRepositoryChecker,
    syncInTerminalChecker: SyncInTerminalChecker,
    syncInUserAccountChecker: SyncInUserAccountChecker,
    terminalStore: TerminalStore
})

groundTransport.setDependencies(SyncInDataChecker, {
    airportDatabase: AIRPORT_DATABASE,
	applicationUtils: APPLICATION_UTILS,
    appTrackerUtils: AppTrackerUtils,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    systemWideOperationIdUtils: SystemWideOperationIdUtils,
    terminalStore: TerminalStore
})

groundTransport.setDependencies(SyncInRepositoryChecker, {
    datastructureUtils: DatastructureUtils,
	dictionary: Dictionary,
    repositoryDao: RepositoryDao,
	repositoryMemberDao: RepositoryMemberDao
})

groundTransport.setDependencies(SyncInTerminalChecker, {
    terminalDao: TerminalDao
})

groundTransport.setDependencies(SyncInUserAccountChecker, {
    keyUtils: KeyUtils,
    userAccountDao: UserAccountDao
})

groundTransport.setDependencies(SyncInUtils, {
    datastructureUtils: DatastructureUtils
})

groundTransport.setDependencies(SyncOutDataPreparer, {
    actorDao: ActorDao,
    applicationUtils: APPLICATION_UTILS,
    applicationNameUtils: ApplicationNameUtils,
    dbRelationDao: DdlRelationDao,
    dictionary: Dictionary,
    repositoryDao: RepositoryDao,
    userAccountDao: UserAccountDao
})

groundTransport.setDependencies(SynchronizationAdapterLoader, {
    debugSynchronizationAdapter: DebugSynchronizationAdapter
})

groundTransport.setDependencies(SynchronizationInManager, {
    repositoryLoader: REPOSITORY_LOADER,
    repositoryBlockDao: RepositoryBlockDao,
    syncInApplicationVersionChecker: SyncInApplicationVersionChecker,
    syncInChecker: SyncInChecker,
    transactionManager: TRANSACTION_MANAGER,
    twoStageSyncedInDataProcessor: TwoStageSyncedInDataProcessor
})

groundTransport.setDependencies(SynchronizationOutManager, {
    datastructureUtils: DatastructureUtils,
    messageSigningManager: BlockSigningManager,
    repositoryReferenceCreator: RepositoryReferenceCreator,
    repositoryBlockDao: RepositoryBlockDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    syncOutDataPreparer: SyncOutDataPreparer
})

groundTransport.setDependencies(TwoStageSyncedInDataProcessor, {
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryDao: RepositoryDao,
    repositoryMemberAcceptanceDao: RepositoryMemberAcceptanceDao,
    repositoryMemberDao: RepositoryMemberDao,
    repositoryMemberInvitationDao: RepositoryMemberInvitationDao,
    repositoryReferenceCreator: RepositoryReferenceCreator,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    stage1SyncedInDataProcessor: Stage1SyncedInDataProcessor,
    stage2SyncedInDataProcessor: Stage2SyncedInDataProcessor,
    // synchronizationConflictDao: SynchronizationConflictDao,
    // synchronizationConflictValuesDao: SynchronizationConflictValuesDao
})
