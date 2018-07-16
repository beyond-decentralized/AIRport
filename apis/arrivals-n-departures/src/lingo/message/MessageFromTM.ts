import {
	AgtRepositoryId,
	AgtSharingMessageId,
	RepositoryTransactionBlockContents,
	TerminalId,
	TerminalPassword, TmRepositoryTransactionBlockId,
	TmSharingMessageId
} from "../CoreAgtTypes";
import {ConnectionDataCallback} from "./MessageToTM";
import {
	MessageFromTMContentType,
	TmToAgtProtocolVersion
}                               from "./MessageTypes";

/**
 * Needed to authenticate sending TM with AGT.
 */
export interface TerminalCredentials {
	terminalId: TerminalId
	terminalPassword: TerminalPassword
}

/**
 * Request to sync an RTB to other TMs
 */
export interface RepositoryUpdateRequest {
	// Needed for AGT to route RTB to other TMs
	agtRepositoryId: AgtRepositoryId;
	// Needed to ACK the status of RTB sync from AGT back to TM
	tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;
	// The RTB contents being synced
	repositoryTransactionBlockContents: RepositoryTransactionBlockContents;
}

export type TerminalAdditionsToRepositories = null; // FIXME: implement
export type DetectedSyncDiscrepancies = null; // FIXME: implement

export type MessageFromTM =
	| DataTransferMessageFromTM
	| SyncVerificationMessageFromTM
	| ConnectionVerificationMessageFromTM;

export interface AbstractMessageFromTM {
	protocolVersion: TmToAgtProtocolVersion;
	contentType: MessageFromTMContentType;
	terminalCredentials: TerminalCredentials;
}

/**
 * Normal operation message from TM
 */
export interface DataTransferMessageFromTM
	extends AbstractMessageFromTM {
	contentType: MessageFromTMContentType.DATA_TRANSFER;
	tmSharingMessageId: TmSharingMessageId; // Will be ACKed back to TM
	repositoryUpdateRequests: RepositoryUpdateRequest[];
	terminalSyncAcks: AgtSharingMessageId[]; // ACKs back to AGT of received syncs
	// syncsToVerify: SyncsToVerify;
	// TerminalAdditionsToRepositories[],
	// DetectedSyncDiscrepancies[]
}

export interface SyncsToVerify {
	sharingMessageIds: TmSharingMessageId[]; // Ids of messages sent to AGT by this TM
	// repoTransBlockIds: TmRepositoryTransactionBlockId[];
}

/**
 * Verification of message reception by AGT message from TM
 */
export interface SyncVerificationMessageFromTM
	extends AbstractMessageFromTM {
	contentType: MessageFromTMContentType.SYNC_VERIFICATIONS;
	syncsToVerify: SyncsToVerify;
}

/**
 * Verification of alive status of AGT
 */
export interface ConnectionVerificationMessageFromTM
	extends AbstractMessageFromTM {
	contentType: MessageFromTMContentType.CONNECTION_REQUEST;
}

export interface VerifiedMessagesFromTM {
	terminalIds: Set<TerminalId>;
	repositoryIds: Set<AgtRepositoryId>;
	agtSharingMessageIds: Set<AgtSharingMessageId>;
	syncConnectionClaimsByTmId: Map<TerminalId, SyncConnectionClaim>;
}

/*
export interface VerifiedTMSseMessages {
	terminalIds: TerminalId[];
	connectionDataCallbacksByTmId: Map<TerminalId, ConnectionDataCallback>;
};
*/

export type LoginClaimReceptionTime = number;

export interface SyncConnectionClaim {
	messageFromTM: MessageFromTM,
	connectionDataCallback: ConnectionDataCallback,
	// Needed when recording Repository Update requests
	loginClaimReceptionTime: LoginClaimReceptionTime
}


