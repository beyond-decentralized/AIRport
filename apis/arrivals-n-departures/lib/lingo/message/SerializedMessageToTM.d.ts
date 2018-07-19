import { AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { MessageToTMContentType, RepoTransBlockSyncOutcomeType, TmToAgtProtocolVersion } from "./MessageTypes";
/**
 * AGT always batches messages to TMs
 */
export declare type SerializedBatchedMessagesToTM = [TmToAgtProtocolVersion, TerminalId[], // Currently array of 1
AgtSharingMessageId, // id of this batch, to be ACKed back to AGT
SerializedMessageToTM[]];
export declare type SerializedMessageToTM = SerializedRepoTransBlockMessageToTM | SerializedSyncNotificationMessageToTM | SerializedAliveAcknowledgementMessageToTM;
/**
 * Data from other TMs
 */
export declare type SerializedRepoTransBlockMessageToTM = [MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK, RepositoryTransactionBlockContents];
/**
 * Status of syncing RTB to AGT
 */
export declare type SerializedRepoTransBlockSyncOutcome = [TmRepositoryTransactionBlockId, RepoTransBlockSyncOutcomeType];
/**
 * ACK of data sync from this TM
 */
export declare type SerializedSyncNotificationMessageToTM = [MessageToTMContentType.SYNC_NOTIFICATION, TmSharingMessageId, SerializedRepoTransBlockSyncOutcome[]];
export declare type SerializedAliveAcknowledgementMessageToTM = [MessageToTMContentType.ALIVE_ACK];
