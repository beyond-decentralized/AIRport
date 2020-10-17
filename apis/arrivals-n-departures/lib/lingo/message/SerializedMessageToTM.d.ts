import { AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { MessageToTMContentType, SharingNodeRepoTransBlockSyncStatus, TmToAgtProtocolVersion } from "./MessageTypes";
/**
 * AGT always batches messages to TMs
 */
export declare type SerializedBatchedMessagesToTM = [
    TmToAgtProtocolVersion,
    TerminalId[],
    AgtSharingMessageId,
    SerializedMessageToTM[]
];
export declare type SerializedMessageToTM = SerializedRepoTransBlockMessageToTM | SerializedSyncNotificationMessageToTM | SerializedAliveAcknowledgementMessageToTM;
/**
 * Data from other TMs
 */
export declare type SerializedRepoTransBlockMessageToTM = [
    MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK,
    RepositoryTransactionBlockContents
];
/**
 * Status of syncing RTB to AGT
 */
export declare type SerializedRepoTransBlockSyncStatus = [
    TmRepositoryTransactionBlockId,
    SharingNodeRepoTransBlockSyncStatus
];
/**
 * ACK of data sync from this TM
 */
export declare type SerializedSyncNotificationMessageToTM = [
    MessageToTMContentType.SYNC_NOTIFICATION,
    TmSharingMessageId,
    SerializedRepoTransBlockSyncStatus[]
];
export declare type SerializedAliveAcknowledgementMessageToTM = [
    MessageToTMContentType.ALIVE_ACK
];
//# sourceMappingURL=SerializedMessageToTM.d.ts.map