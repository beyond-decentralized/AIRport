import {
	AgtRepositoryId,
	AgtSharingMessageId,
	RepositoryTransactionBlockContents,
	TerminalId,
	TerminalPassword, TmRepositoryTransactionBlockId,
	TmSharingMessageId
} from "../CoreAgtTypes";
import {
	MessageFromTMContentType,
	TmToAgtProtocolVersion
} from "./MessageTypes";

/**
 * Needed to authenticate sending TM with AGT.
 */
export type SerializedTerminalCredentials = [
	TerminalId,
	TerminalPassword
	];

/**
 * Request to sync an RTB to other TMs
 */
export type SerializedRepositoryUpdateRequest = [
	// Needed for AGT to route RTB to other TMs
	AgtRepositoryId,
	// Needed to ACK the status of RTB sync from AGT back to TM
	TmRepositoryTransactionBlockId,
	// The RTB contents being synced
	RepositoryTransactionBlockContents
	];

export type SerializedMessageFromTM =
	| SerializedDataTransferMessageFromTM
	| SerializedSyncVerificationMessageFromTM
	| SerializedConnectionVerificationMessageFromTM;

/**
 * Normal operation message from TM
 */
export type SerializedDataTransferMessageFromTM = [
	// Header START
	TmToAgtProtocolVersion,
	MessageFromTMContentType.DATA_TRANSFER,
	SerializedTerminalCredentials,
	// Header END
	TmSharingMessageId, // Will be ACKed back to TM
	SerializedRepositoryUpdateRequest[],
	AgtSharingMessageId[] // ACKs back to AGT of received syncs
	// SerializedSyncsToVerify
	// TerminalAdditionsToRepositories[],
	// DetectedSyncDiscrepancies[]
	];

export type SerializedSyncsToVerify = [
	TmSharingMessageId[] // Ids of messages sent to AGT by this TM
	// TmRepositoryTransactionBlockId[]
	];

/**
 * Verification of message reception by AGT message from TM
 */
export type SerializedSyncVerificationMessageFromTM = [
	// Header START
	TmToAgtProtocolVersion,
	MessageFromTMContentType.SYNC_VERIFICATIONS,
	SerializedTerminalCredentials,
	// Header END
	SerializedSyncsToVerify
	];

/**
 * Verification of alive status of AGT
 */
export type SerializedConnectionVerificationMessageFromTM = [
	// Header START
	TmToAgtProtocolVersion,
	MessageFromTMContentType.CONNECTION_REQUEST,
	SerializedTerminalCredentials
	// Header END
	];
