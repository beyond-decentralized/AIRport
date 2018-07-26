import {
	ILoggedPackage,
	LoggedPackage
}                                                  from "@airport/approach-lighting-system";
import {IStoreDriver}                              from "@airport/ground-control";
import {LogLevel}                                  from "@airport/runway-edge-lighting";
import {Token}                                     from "typedi";
import {ISharingNodeEndpoint}                      from "./synchronization/connect/SharingNodeEndpoint";
import {ISyncInActorChecker}                       from "./synchronization/in/checker/SyncInActorChecker";
import {ISyncInChecker}                            from "./synchronization/in/checker/SyncInChecker";
import {ISyncInConsistencyChecker}                 from "./synchronization/in/checker/SyncInConsistencyChecker";
import {ISyncInDataChecker}                       from "./synchronization/in/checker/SyncInDataChecker";
import {ISyncInRepositoryChecker}                 from "./synchronization/in/checker/SyncInRepositoryChecker";
import {ISyncInSchemaChecker}                     from "./synchronization/in/checker/SyncInSchemaChecker";
import {ISyncInTerminalChecker}                   from "./synchronization/in/checker/SyncInTerminalChecker";
import {ISyncInUserChecker}                       from "./synchronization/in/checker/SyncInUserChecker";
import {IMissingRecordCreator}                    from "./synchronization/in/creator/MissingRecordCreator";
import {ISyncInRepositoryTransactionBlockCreator} from "./synchronization/in/creator/SyncInRepositoryTransactionBlockCreator";
import {ISyncInSharingMessageCreator}             from "./synchronization/in/creator/SyncInSharingMessageCreator";
import {IStage1SyncedInDataProcessor}             from "./synchronization/in/Stage1SyncedInDataProcessor";
import {IStage2SyncedInDataProcessor}             from "./synchronization/in/Stage2SyncedInDataProcessor";
import {ISynchronizationInManager}                from "./synchronization/in/SynchronizationInManager";
import {ISyncInUtils}                              from "./synchronization/in/SyncInUtils";
import {ISyncLogMessageProcessor}                  from "./synchronization/in/SyncLogMessageProcessor";
import {ITwoStageSyncedInDataProcessor}            from "./synchronization/in/TwoStageSyncedInDataProcessor";
import {ISynchronizationOutCoordinator}            from "./synchronization/out/SynchronizationOutCoordinator";
import {ISynchronizationOutManager}                from "./synchronization/out/SynchronizationOutManager";
import {ISyncOutMessageSender}                     from "./synchronization/out/SyncOutMessageSender";
import {ISyncOutRepositoryTransactionBlockCreator} from "./synchronization/out/SyncOutRepositoryTransactionBlockCreator";
import {ISyncOutSerializer}                        from "./synchronization/out/SyncOutSerializer";
import {ISyncNodeManager}                          from "./synchronization/SyncNodeManager";

export const DirectSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const HttpSharingNodeEndpointToken = new Token<ISharingNodeEndpoint>();
export const MissingRecordCreatorToken = new Token<IMissingRecordCreator>();
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

export const GroundTransportLogger: ILoggedPackage
	= new LoggedPackage("ground-transport", LogLevel.TRACE);

