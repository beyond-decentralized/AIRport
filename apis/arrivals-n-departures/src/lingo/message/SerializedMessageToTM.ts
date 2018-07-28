import {
	AgtSharingMessageId,
	RepositoryTransactionBlockContents,
	TerminalId,
	TmRepositoryTransactionBlockId,
	TmSharingMessageId
} from "../CoreAgtTypes";
import {
	MessageToTMContentType,
	SharingNodeRepoTransBlockSyncStatus,
	TmToAgtProtocolVersion
} from "./MessageTypes";

/**
 * AGT always batches messages to TMs
 */
export type SerializedBatchedMessagesToTM = [
	TmToAgtProtocolVersion,
	TerminalId[], // Currently array of 1
	AgtSharingMessageId, // id of this batch, to be ACKed back to AGT
	SerializedMessageToTM[]
	];

export type SerializedMessageToTM =
	SerializedRepoTransBlockMessageToTM // Data from other TMs
	| SerializedSyncNotificationMessageToTM // ACK of data sync from this TM
	// | SerializedSyncAcknowledgementMessageToTM
	| SerializedAliveAcknowledgementMessageToTM
	;

/**
 * Data from other TMs
 */
export type SerializedRepoTransBlockMessageToTM = [
	MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK,
	// AgtRepositoryTransactionBlockId,
	// TerminalId,
	// AgtRepositoryId,
	// AgtRepositoryTransactionBlockAddDatetime,
	// TmRepositoryTransactionBlockId,
	RepositoryTransactionBlockContents
	];

/**
 * Status of syncing RTB to AGT
 */
export type SerializedRepoTransBlockSyncStatus = [
	TmRepositoryTransactionBlockId,
	// AgtRepositoryTransactionBlockId,
	SharingNodeRepoTransBlockSyncStatus
	];

/**
 * ACK of data sync from this TM
 */
export type SerializedSyncNotificationMessageToTM = [
	MessageToTMContentType.SYNC_NOTIFICATION,
	TmSharingMessageId,
	// AgtSharingMessageId,
	// AgtRepositoryTransactionBlockAddDatetime,
	SerializedRepoTransBlockSyncStatus[]
	];

// export type SerializedSyncAcknowledgementMessageToTM = [
// 	MessageToTMContentType.SYNC_ACK,
// 	SerializedRepoTransBlockSyncStatus[]
// 	];

export type SerializedAliveAcknowledgementMessageToTM = [
	MessageToTMContentType.ALIVE_ACK
	];


