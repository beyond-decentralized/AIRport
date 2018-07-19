import { AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { MessageToTMContentType, RepoTransBlockSyncOutcomeType, TmToAgtProtocolVersion } from "./MessageTypes";
/**
 * AGT always batches messages to TMs
 */
export interface BatchedMessagesToTM {
    protocolVersion: TmToAgtProtocolVersion;
    targetAgtTerminalIds: TerminalId[];
    agtSharingMessageId: AgtSharingMessageId;
    messages: MessageToTM[];
}
export declare type MessageToTM = RepoTransBlockMessageToTM | SyncNotificationMessageToTM | AliveAcknowledgementMessageToTM;
export interface AbstractMessageToTM {
    contentType: MessageToTMContentType;
}
/**
 * Data from other TMs
 */
export interface RepoTransBlockMessageToTM extends AbstractMessageToTM {
    contentType: MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK;
    repositoryTransactionBlock: RepositoryTransactionBlockContents;
}
/**
 * Status of syncing RTB to AGT
 */
export interface RepoTransBlockSyncOutcome {
    tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;
    syncOutcomeType: RepoTransBlockSyncOutcomeType;
}
/**
 * ACK of data sync frm this TM
 */
export interface SyncNotificationMessageToTM extends AbstractMessageToTM {
    contentType: MessageToTMContentType.SYNC_NOTIFICATION;
    tmSharingMessageId: TmSharingMessageId;
    syncOutcomes: RepoTransBlockSyncOutcome[];
}
export interface AliveAcknowledgementMessageToTM extends AbstractMessageToTM {
    contentType: MessageToTMContentType.ALIVE_ACK;
}
export interface ConnectionDataCallback {
    (terminalId: TerminalId, writeHeaders: boolean, data: MessageToTM): void;
}
