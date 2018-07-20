import {IStoreDriver}                             from "@airport/ground-control";
import {Token}                                    from "typedi";
import {ISyncInRepositoryTransactionBlockCreator} from "./synchronization/in/creator/SyncInRepositoryTransactionBlockCreator";
import {
	ISyncInSharingMessageCreator,
	SyncInSharingMessageCreator
} from "./synchronization/in/creator/SyncInSharingMessageCreator";
import {ISynchronizationInManager}                from "./synchronization/in/SynchronizationInManager";
import {ISynchronizationOutManager}               from "./synchronization/out/SynchronizationOutManager";
import {ISyncNodeManager}                         from "./synchronization/SyncNodeManager";
import {IStage1SyncedInDataProcessor}             from "./synchronization/in/Stage1SyncedInDataProcessor";
import {IStage2SyncedInDataProcessor}             from "./synchronization/in/Stage2SyncedInDataProcessor";
import {ISyncInUtils}                             from "./synchronization/in/SyncInUtils";
import {ITwoStageSyncedInDataProcessor} from "./synchronization/in/TwoStageSyncedInDataProcessor";
import {ISyncInSchemaChecker} from "./synchronization/in/checker/SyncInSchemaChecker";
import {ISyncInDataChecker} from "./synchronization/in/checker/SyncInDataChecker";
import {ISyncInChecker} from "./synchronization/in/checker/SyncInChecker";
import {ISyncInActorChecker} from "./synchronization/in/checker/SyncInActorChecker";
import {ISyncInRepositoryChecker} from "./synchronization/in/checker/SyncInRepositoryChecker";
import {ISyncInConsistencyChecker} from "./synchronization/in/checker/SyncInConsistencyChecker";
import {ILoggedPackage, LoggedPackage} from "@airport/approach-lighting-system";
import {LogLevel} from "@airport/runway-edge-lighting";
import {
	ILoggedApplication,
	LoggedApplication
}                                                  from "@airport/approach-lighting-system/lib/LoggedApplication";
import {ISyncLogMessageProcessor}                  from "./synchronization/in/SyncLogMessageProcessor";
import {ISynchronizationOutCoordinator}            from "./synchronization/out/SynchronizationOutCoordinator";
import {ISyncOutSerializer}                        from "./synchronization/out/SyncOutSerializer";
import {ISyncOutMessageSender}                     from "./synchronization/out/SyncOutMessageSender";
import {ISyncOutRepositoryTransactionBlockCreator} from "./synchronization/out/SyncOutRepositoryTransactionBlockCreator";
import {ISharingNodeEndpoint}                      from "./synchronization/connect/SharingNodeEndpoint";
import {ISyncInTerminalChecker}                    from "./synchronization/in/checker/SyncInTerminalChecker";
import {ISyncInUserChecker}                        from "./synchronization/in/checker/SyncInUserChecker";

export const DirectSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const HttpSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const Stage1SyncedInDataProcessorToken = new Token<IStage1SyncedInDataProcessor>();
export const Stage2SyncedInDataProcessorToken = new Token<IStage2SyncedInDataProcessor>();
export const StoreDriverToken = new Token<IStoreDriver>();
export const SyncInActorCheckerToken = new Token<ISyncInActorChecker>();
export const SyncInCheckerToken = new Token<ISyncInChecker>();
export const SyncInConsistencyCheckerToken = new Token<ISyncInConsistencyChecker>();
export const SyncInDataCheckerToken = new Token<ISyncInDataChecker>();
export const SyncInTerminalCheckerToken = new Token<ISyncInTerminalChecker>();
export const SyncInRepositoryCheckerToken = new Token<ISyncInRepositoryChecker>();
export const SyncInRepositoryTransactionBlockCreatorToken
	= new Token<ISyncInRepositoryTransactionBlockCreator>();
export const SyncInSchemaCheckerToken = new Token<ISyncInSchemaChecker>();
export const SyncInSharingMessageCreatorToken = new Token<ISyncInSharingMessageCreator>();
export const SyncInUserCheckerToken = new Token<ISyncInUserChecker>();
export const SyncInUtilsToken = new Token<ISyncInUtils>();
export const SyncLogMessageProcessorToken = new Token<ISyncLogMessageProcessor>();
export const SyncNodeManagerToken = new Token<ISyncNodeManager>();
export const SynchronizationInManagerToken = new Token<ISynchronizationInManager>();
export const SynchronizationOutCoordinatorToken = new Token<ISynchronizationOutCoordinator>();
export const SynchronizationOutManagerToken = new Token<ISynchronizationOutManager>();
export const SyncOutMessageSenderToken = new Token<ISyncOutMessageSender>();
export const SyncOutRepositoryTransactionBlockCreatorToken
	= new Token<ISyncOutRepositoryTransactionBlockCreator>();
export const SyncOutSerializerToken = new Token<ISyncOutSerializer>();
export const TwoStageSyncedInDataProcessorToken = new Token<ITwoStageSyncedInDataProcessor>();

export const TerminalLogger: ILoggedPackage
	= new LoggedPackage("terminal", LogLevel.TRACE);

export const TerminalAppLogger: ILoggedApplication
	= new LoggedApplication("Airport");
TerminalAppLogger.addPackage(TerminalLogger);

