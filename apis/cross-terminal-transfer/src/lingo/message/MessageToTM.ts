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
export interface BatchedMessagesToTM {
	protocolVersion: TmToAgtProtocolVersion;
	targetAgtTerminalIds: TerminalId[]; // Currently array of 1
	agtSharingMessageId: AgtSharingMessageId; // AGT id of this batch, to be ACKed back to AGT
	messages: MessageToTM[]
}

export type MessageToTM =
	RepoTransBlockMessageToTM // Data from other TMs
	| SyncNotificationMessageToTM // ACK of data sync from this TM
	// | SyncAcknowledgementMessageToTM
	| AliveAcknowledgementMessageToTM
	;

export interface AbstractMessageToTM {
	contentType: MessageToTMContentType;
}

/**
 * Data from other TMs
 */
export interface RepoTransBlockMessageToTM
	extends AbstractMessageToTM {
	contentType: MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK;
	// sourceTerminalId: TerminalId;
	// agtRepositoryTransactionBlockId: AgtRepositoryTransactionBlockId;
	// agtRepositoryId: AgtRepositoryId;
	// addDatetime: AgtRepositoryTransactionBlockAddDatetime;
	// tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId,
	repositoryTransactionBlock: RepositoryTransactionBlockContents
}

/**
 * Status of syncing RTB to AGT
 */
export interface RepoTransBlockSyncStatus {
	tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId,
	// agtRepositoryTransactionBlockId: AgtRepositoryTransactionBlockId,
	syncStatus: SharingNodeRepoTransBlockSyncStatus
}

/**
 * ACK of data sync frm this TM
 */
export interface SyncNotificationMessageToTM
	extends AbstractMessageToTM {
	contentType: MessageToTMContentType.SYNC_NOTIFICATION;
	tmSharingMessageId: TmSharingMessageId;
	// terminalSyncLogId: AgtSharingMessageId;
	// agtRepositoryTransactionBlockAddDatetime: AgtRepositoryTransactionBlockAddDatetime;
	syncOutcomes: RepoTransBlockSyncStatus[];
}

// export interface SyncAcknowledgementMessageToTM
// 	extends AbstractMessageToTM {
// 	contentType: MessageToTMContentType.SYNC_ACK;
// 	syncOutcomes: RepoTransBlockSyncStatus[];
// }

export interface AliveAcknowledgementMessageToTM
	extends AbstractMessageToTM {
	contentType: MessageToTMContentType.ALIVE_ACK;
}

export interface ConnectionDataCallback {
	(
		terminalId: TerminalId,
		writeHeaders: boolean,
		data: MessageToTM,
	): void;
}
