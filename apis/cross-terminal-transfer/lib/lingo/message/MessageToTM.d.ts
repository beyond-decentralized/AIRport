import { AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { MessageToTMContentType, SharingNodeRepoTransBlockSyncStatus, TmToAgtProtocolVersion } from "./MessageTypes";
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
export interface RepoTransBlockSyncStatus {
    tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;
    syncStatus: SharingNodeRepoTransBlockSyncStatus;
}
/**
 * ACK of data sync frm this TM
 */
export interface SyncNotificationMessageToTM extends AbstractMessageToTM {
    contentType: MessageToTMContentType.SYNC_NOTIFICATION;
    tmSharingMessageId: TmSharingMessageId;
    syncOutcomes: RepoTransBlockSyncStatus[];
}
export interface AliveAcknowledgementMessageToTM extends AbstractMessageToTM {
    contentType: MessageToTMContentType.ALIVE_ACK;
}
export interface ConnectionDataCallback {
    (terminalId: TerminalId, writeHeaders: boolean, data: MessageToTM): void;
}
//# sourceMappingURL=MessageToTM.d.ts.map