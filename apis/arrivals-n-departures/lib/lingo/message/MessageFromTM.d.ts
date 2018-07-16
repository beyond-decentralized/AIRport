import { AgtRepositoryId, AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TerminalPassword, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { ConnectionDataCallback } from "./MessageToTM";
import { MessageFromTMContentType, TmToAgtProtocolVersion } from "./MessageTypes";
/**
 * Needed to authenticate sending TM with AGT.
 */
export interface TerminalCredentials {
    terminalId: TerminalId;
    terminalPassword: TerminalPassword;
}
/**
 * Request to sync an RTB to other TMs
 */
export interface RepositoryUpdateRequest {
    agtRepositoryId: AgtRepositoryId;
    tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;
    repositoryTransactionBlockContents: RepositoryTransactionBlockContents;
}
export declare type TerminalAdditionsToRepositories = null;
export declare type DetectedSyncDiscrepancies = null;
export declare type MessageFromTM = DataTransferMessageFromTM | SyncVerificationMessageFromTM | ConnectionVerificationMessageFromTM;
export interface AbstractMessageFromTM {
    protocolVersion: TmToAgtProtocolVersion;
    contentType: MessageFromTMContentType;
    terminalCredentials: TerminalCredentials;
}
/**
 * Normal operation message from TM
 */
export interface DataTransferMessageFromTM extends AbstractMessageFromTM {
    contentType: MessageFromTMContentType.DATA_TRANSFER;
    tmSharingMessageId: TmSharingMessageId;
    repositoryUpdateRequests: RepositoryUpdateRequest[];
    terminalSyncAcks: AgtSharingMessageId[];
}
export interface SyncsToVerify {
    sharingMessageIds: TmSharingMessageId[];
}
/**
 * Verification of message reception by AGT message from TM
 */
export interface SyncVerificationMessageFromTM extends AbstractMessageFromTM {
    contentType: MessageFromTMContentType.SYNC_VERIFICATIONS;
    syncsToVerify: SyncsToVerify;
}
/**
 * Verification of alive status of AGT
 */
export interface ConnectionVerificationMessageFromTM extends AbstractMessageFromTM {
    contentType: MessageFromTMContentType.CONNECTION_REQUEST;
}
export interface VerifiedMessagesFromTM {
    terminalIds: Set<TerminalId>;
    repositoryIds: Set<AgtRepositoryId>;
    agtSharingMessageIds: Set<AgtSharingMessageId>;
    syncConnectionClaimsByTmId: Map<TerminalId, SyncConnectionClaim>;
}
export declare type LoginClaimReceptionTime = number;
export interface SyncConnectionClaim {
    messageFromTM: MessageFromTM;
    connectionDataCallback: ConnectionDataCallback;
    loginClaimReceptionTime: LoginClaimReceptionTime;
}
