import {IStoreDriver} from "@airport/ground-control";
import {Token} from "typedi";
import {ITerminalStore} from "./+state/TerminalStore";
import {IRepositoryManager} from "./core/repository/RepositoryManager";
import {IOfflineDeltaStore} from "./data/OfflineDeltaStore";
import {IOnlineManager} from "./net/OnlineManager";
import {ISynchronizationInManager} from "../../../libs/ground-transport/synchronization/in/SynchronizationInManager";
import {ISynchronizationOutManager} from "../../../libs/ground-transport/synchronization/out/SynchronizationOutManager";
import {ISyncNodeManager} from "../../../libs/ground-transport/synchronization/SyncNodeManager";
import {IDatabaseManager} from "./orchestration/DatabaseManager";
import {IDeleteManager} from "./orchestration/DeleteManager";
import {IHistoryManager} from "./orchestration/HistoryManager";
import {IInsertManager} from "./orchestration/InsertManager";
import {IQueryManager} from "./orchestration/QueryManager";
import {ITransactionManager} from "./orchestration/TransactionManager";
import {IUpdateManager} from "./orchestration/UpdateManager";
import {IActiveQueries} from "./store/ActiveQueries";
import {IIdGenerator} from "./store/IdGenerator";
import {IStage1SyncedInDataProcessor} from "../../../libs/ground-transport/synchronization/in/Stage1SyncedInDataProcessor";
import {IStage2SyncedInDataProcessor} from "../../../libs/ground-transport/synchronization/in/Stage2SyncedInDataProcessor";
import {ISyncInUtils} from "../../../libs/ground-transport/synchronization/in/SyncInUtils";
import {ITwoStageSyncedInDataProcessor} from "../../../libs/ground-transport/synchronization/in/TwoStageSyncedInDataProcessor";
import {ISyncInSchemaChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInSchemaChecker";
import {ISyncInDataChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInDataChecker";
import {ISyncInChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInChecker";
import {ISyncInActorChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInActorChecker";
import {ISyncInRepositoryChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInRepositoryChecker";
import {ISyncInConsistencyChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInConsistencyChecker";
import {ILoggedPackage, LoggedPackage} from "@airport/approach-lighting-system";
import {LogLevel} from "@airport/runway-edge-lighting";
import {
	ILoggedApplication,
	LoggedApplication
} from "@airport/approach-lighting-system/lib/LoggedApplication";
import {ISyncLogMessageProcessor} from "../../../libs/ground-transport/synchronization/in/SyncLogMessageProcessor";
import {ISynchronizationOutCoordinator} from "../../../libs/ground-transport/synchronization/out/SynchronizationOutCoordinator";
import {ISyncOutSerializer} from "../../../libs/ground-transport/synchronization/out/SyncOutSerializer";
import {ISyncOutMessageSender} from "../../../libs/ground-transport/synchronization/out/SyncOutMessageSender";
import {IRepositoryTransactionBlockCreator} from "../../../libs/ground-transport/synchronization/out/RepositoryTransactionBlockCreator";
import {ISharingNodeEndpoint} from "../../../libs/ground-transport/synchronization/connect/SharingNodeEndpoint";
import {ISyncInDatabaseChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInDatabaseChecker";
import {ISyncInDataFormatValidator} from "../../../libs/ground-transport/synchronization/in/validator/SyncInDataFormatValidator";
import {ISyncInUserChecker} from "../../../libs/ground-transport/synchronization/in/checker/SyncInUserChecker";
import {ISyncInDataSchemaValidator} from "../../../libs/ground-transport/synchronization/in/validator/SyncInDataSchemaValidator";
import {ISyncInDataDeserializer} from "../../../libs/ground-transport/synchronization/in/validator/SyncInDataDeserializer";

export const ActiveQueriesToken = new Token<IActiveQueries>();
export const DatabaseManagerToken = new Token<IDatabaseManager>();
export const DeleteManagerToken = new Token<IDeleteManager>();
export const DirectSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const HistoryManagerToken = new Token<IHistoryManager>();
export const HttpSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const IdGeneratorToken = new Token<IIdGenerator>();
export const InsertManagerToken = new Token<IInsertManager>();
export const OfflineDeltaStoreToken = new Token<IOfflineDeltaStore>();
export const OnlineManagerToken = new Token<IOnlineManager>();
export const QueryManagerToken = new Token<IQueryManager>();
export const RepositoryManagerToken = new Token<IRepositoryManager>();
export const RepositoryTransactionBlockCreatorToken
	= new Token<IRepositoryTransactionBlockCreator>();
export const Stage1SyncedInDataProcessorToken = new Token<IStage1SyncedInDataProcessor>();
export const Stage2SyncedInDataProcessorToken = new Token<IStage2SyncedInDataProcessor>();
export const StoreDriverToken = new Token<IStoreDriver>();
export const SyncInActorCheckerToken = new Token<ISyncInActorChecker>();
export const SyncInCheckerToken = new Token<ISyncInChecker>();
export const SyncInConsistencyCheckerToken = new Token<ISyncInConsistencyChecker>();
export const SyncInDataCheckerToken = new Token<ISyncInDataChecker>();
export const SyncInDatabaseCheckerToken = new Token<ISyncInDatabaseChecker>();
export const SyncInDataDeserializerToken = new Token<ISyncInDataDeserializer>();
export const SyncInDataFormatValidatorToken = new Token<ISyncInDataFormatValidator>();
export const SyncInDataSchemaValidatorToken = new Token<ISyncInDataSchemaValidator>();
export const SyncInRepositoryCheckerToken = new Token<ISyncInRepositoryChecker>();
export const SyncInSchemaCheckerToken = new Token<ISyncInSchemaChecker>();
export const SyncInUserCheckerToken = new Token<ISyncInUserChecker>();
export const SyncInUtilsToken = new Token<ISyncInUtils>();
export const SyncLogMessageProcessorToken = new Token<ISyncLogMessageProcessor>();
export const SyncNodeManagerToken = new Token<ISyncNodeManager>();
export const SynchronizationInManagerToken = new Token<ISynchronizationInManager>();
export const SynchronizationOutCoordinatorToken = new Token<ISynchronizationOutCoordinator>();
export const SynchronizationOutManagerToken = new Token<ISynchronizationOutManager>();
export const SyncOutMessageSenderToken = new Token<ISyncOutMessageSender>();
export const SyncOutSerializerToken = new Token<ISyncOutSerializer>();
export const TransactionManagerToken = new Token<ITransactionManager>();
export const TwoStageSyncedInDataProcessorToken = new Token<ITwoStageSyncedInDataProcessor>();
export const UpdateManagerToken = new Token<IUpdateManager>();

export const TerminalLogger: ILoggedPackage
	= new LoggedPackage("terminal", LogLevel.TRACE);

export const TerminalAppLogger: ILoggedApplication
	= new LoggedApplication("Airport");
TerminalAppLogger.addPackage(TerminalLogger);

