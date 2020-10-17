import { AgtRepositoryId, AgtSharingMessageId, RepositoryTransactionBlockContents, TerminalId, TerminalPassword, TmRepositoryTransactionBlockId, TmSharingMessageId } from "../CoreAgtTypes";
import { MessageFromTMContentType, TmToAgtProtocolVersion } from "./MessageTypes";
/**
 * Needed to authenticate sending TM with AGT.
 */
export declare type SerializedTerminalCredentials = [
    TerminalId,
    TerminalPassword
];
/**
 * Request to sync an RTB to other TMs
 */
export declare type SerializedRepositoryUpdateRequest = [
    AgtRepositoryId,
    TmRepositoryTransactionBlockId,
    RepositoryTransactionBlockContents
];
export declare type SerializedMessageFromTM = SerializedDataTransferMessageFromTM | SerializedSyncVerificationMessageFromTM | SerializedConnectionVerificationMessageFromTM;
/**
 * Normal operation message from TM
 */
export declare type SerializedDataTransferMessageFromTM = [
    TmToAgtProtocolVersion,
    MessageFromTMContentType.DATA_TRANSFER,
    SerializedTerminalCredentials,
    TmSharingMessageId,
    SerializedRepositoryUpdateRequest[],
    AgtSharingMessageId[]
];
export declare type SerializedSyncsToVerify = [
    TmSharingMessageId[]
];
/**
 * Verification of message reception by AGT message from TM
 */
export declare type SerializedSyncVerificationMessageFromTM = [
    TmToAgtProtocolVersion,
    MessageFromTMContentType.SYNC_VERIFICATIONS,
    SerializedTerminalCredentials,
    SerializedSyncsToVerify
];
/**
 * Verification of alive status of AGT
 */
export declare type SerializedConnectionVerificationMessageFromTM = [
    TmToAgtProtocolVersion,
    MessageFromTMContentType.CONNECTION_REQUEST,
    SerializedTerminalCredentials
];
//# sourceMappingURL=SerializedMessageFromTM.d.ts.map