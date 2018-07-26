import { ILoggedPackage } from "@airport/approach-lighting-system";
import { IStoreDriver } from "@airport/ground-control";
import { Token } from "typedi";
import { ISharingNodeEndpoint } from "./synchronization/connect/SharingNodeEndpoint";
import { ISyncInActorChecker } from "./synchronization/in/checker/SyncInActorChecker";
import { ISyncInChecker } from "./synchronization/in/checker/SyncInChecker";
import { ISyncInConsistencyChecker } from "./synchronization/in/checker/SyncInConsistencyChecker";
import { ISyncInDataChecker } from "./synchronization/in/checker/SyncInDataChecker";
import { ISyncInRepositoryChecker } from "./synchronization/in/checker/SyncInRepositoryChecker";
import { ISyncInSchemaChecker } from "./synchronization/in/checker/SyncInSchemaChecker";
import { ISyncInTerminalChecker } from "./synchronization/in/checker/SyncInTerminalChecker";
import { ISyncInUserChecker } from "./synchronization/in/checker/SyncInUserChecker";
import { IMissingRecordCreator } from "./synchronization/in/creator/MissingRecordCreator";
import { ISyncInRepositoryTransactionBlockCreator } from "./synchronization/in/creator/SyncInRepositoryTransactionBlockCreator";
import { ISyncInSharingMessageCreator } from "./synchronization/in/creator/SyncInSharingMessageCreator";
import { IStage1SyncedInDataProcessor } from "./synchronization/in/Stage1SyncedInDataProcessor";
import { IStage2SyncedInDataProcessor } from "./synchronization/in/Stage2SyncedInDataProcessor";
import { ISynchronizationInManager } from "./synchronization/in/SynchronizationInManager";
import { ISyncInUtils } from "./synchronization/in/SyncInUtils";
import { ISyncLogMessageProcessor } from "./synchronization/in/SyncLogMessageProcessor";
import { ITwoStageSyncedInDataProcessor } from "./synchronization/in/TwoStageSyncedInDataProcessor";
import { ISynchronizationOutCoordinator } from "./synchronization/out/SynchronizationOutCoordinator";
import { ISynchronizationOutManager } from "./synchronization/out/SynchronizationOutManager";
import { ISyncOutMessageSender } from "./synchronization/out/SyncOutMessageSender";
import { ISyncOutRepositoryTransactionBlockCreator } from "./synchronization/out/SyncOutRepositoryTransactionBlockCreator";
import { ISyncOutSerializer } from "./synchronization/out/SyncOutSerializer";
import { ISyncNodeManager } from "./synchronization/SyncNodeManager";
export declare const DirectSharingNodeEndpointToken: Token<ISharingNodeEndpoint>;
export declare const HttpSharingNodeEndpointToken: Token<ISharingNodeEndpoint>;
export declare const MissingRecordCreatorToken: Token<IMissingRecordCreator>;
export declare const Stage1SyncedInDataProcessorToken: Token<IStage1SyncedInDataProcessor>;
export declare const Stage2SyncedInDataProcessorToken: Token<IStage2SyncedInDataProcessor>;
export declare const StoreDriverToken: Token<IStoreDriver>;
export declare const SyncInActorCheckerToken: Token<ISyncInActorChecker>;
export declare const SyncInCheckerToken: Token<ISyncInChecker>;
export declare const SyncInConsistencyCheckerToken: Token<ISyncInConsistencyChecker>;
export declare const SyncInDataCheckerToken: Token<ISyncInDataChecker>;
export declare const SyncInTerminalCheckerToken: Token<ISyncInTerminalChecker>;
export declare const SyncInRepositoryCheckerToken: Token<ISyncInRepositoryChecker>;
export declare const SyncInRepositoryTransactionBlockCreatorToken: Token<ISyncInRepositoryTransactionBlockCreator>;
export declare const SyncInSchemaCheckerToken: Token<ISyncInSchemaChecker>;
export declare const SyncInSharingMessageCreatorToken: Token<ISyncInSharingMessageCreator>;
export declare const SyncInUserCheckerToken: Token<ISyncInUserChecker>;
export declare const SyncInUtilsToken: Token<ISyncInUtils>;
export declare const SyncLogMessageProcessorToken: Token<ISyncLogMessageProcessor>;
export declare const SyncNodeManagerToken: Token<ISyncNodeManager>;
export declare const SynchronizationInManagerToken: Token<ISynchronizationInManager>;
export declare const SynchronizationOutCoordinatorToken: Token<ISynchronizationOutCoordinator>;
export declare const SynchronizationOutManagerToken: Token<ISynchronizationOutManager>;
export declare const SyncOutMessageSenderToken: Token<ISyncOutMessageSender>;
export declare const SyncOutRepositoryTransactionBlockCreatorToken: Token<ISyncOutRepositoryTransactionBlockCreator>;
export declare const SyncOutSerializerToken: Token<ISyncOutSerializer>;
export declare const TwoStageSyncedInDataProcessorToken: Token<ITwoStageSyncedInDataProcessor>;
export declare const GroundTransportLogger: ILoggedPackage;
