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
    DdlApplicationVersionDao,
    DdlDomainDao
} from '@airport/airspace/dist/app/bundle'
import {
    ActorDao,
    RecordHistoryDuo,
    RepositoryDao,
    RepositoryMemberAcceptanceDao,
    RepositoryMemberDao,
    RepositoryMemberInvitationDao,
    RepositoryReferenceDao,
    RepositoryTransactionHistoryDao,
    RepositoryTransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import {
    RecordUpdateStageDao,
    SynchronizationConflictDao,
    SynchronizationConflictValuesDao
} from '@airport/layover'
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
import { MessageSigningManager } from '@airbridge/keyring/dist/app/bundle'
import { RepositoryReferenceCreator } from './synchronization/RepositoryReferenceCreator'

const groundTransport = lib('ground-transport')

groundTransport.register(
    RepositoryReferenceCreator,
    Stage1SyncedInDataProcessor, Stage2SyncedInDataProcessor, SyncInActorChecker,
    SyncInChecker, SyncInDataChecker, SyncInTerminalChecker,
    SyncInRepositoryChecker, SyncInApplicationChecker, SyncInApplicationVersionChecker,
    SyncInUserAccountChecker, SyncInUtils, SynchronizationInManager,
    SynchronizationOutManager, SyncOutDataSerializer, TwoStageSyncedInDataProcessor,
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
    recordUpdateStageDao: RecordUpdateStageDao,
    utils: Utils
})

groundTransport.setDependencies(SyncInActorChecker, {
    actorDao: ActorDao,
})

groundTransport.setDependencies(SyncInApplicationChecker, {
    ddlApplicationDao: DdlApplicationDao,
    applicationNameUtils: ApplicationNameUtils,
    ddlDomainDao: DdlDomainDao
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
	dictionary: Dictionary,
    repositoryDao: RepositoryDao,
	repositoryMemberDao: RepositoryMemberDao
})

groundTransport.setDependencies(SyncInTerminalChecker, {
    terminalDao: TerminalDao
})

groundTransport.setDependencies(SyncInUserAccountChecker, {
    userAccountDao: UserAccountDao
})

groundTransport.setDependencies(SyncInUtils, {
    datastructureUtils: DatastructureUtils
})

groundTransport.setDependencies(SyncOutDataSerializer, {
    actorDao: ActorDao,
    dbRelationDao: DdlRelationDao,
    applicationUtils: APPLICATION_UTILS,
    applicationNameUtils: ApplicationNameUtils,
    dictionary: Dictionary,
    repositoryDao: RepositoryDao,
})

groundTransport.setDependencies(SynchronizationAdapterLoader, {
    debugSynchronizationAdapter: DebugSynchronizationAdapter
})

groundTransport.setDependencies(SynchronizationInManager, {
    repositoryLoader: REPOSITORY_LOADER,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    syncInApplicationVersionChecker: SyncInApplicationVersionChecker,
    syncInChecker: SyncInChecker,
    transactionManager: TRANSACTION_MANAGER,
    twoStageSyncedInDataProcessor: TwoStageSyncedInDataProcessor
})

groundTransport.setDependencies(SynchronizationOutManager, {
    datastructureUtils: DatastructureUtils,
    messageSigningManager: MessageSigningManager,
    repositoryDao: RepositoryDao,
    repositoryReferenceCreator: RepositoryReferenceCreator,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    syncOutDataSerializer: SyncOutDataSerializer
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
    synchronizationConflictDao: SynchronizationConflictDao,
    synchronizationConflictValuesDao: SynchronizationConflictValuesDao
})
