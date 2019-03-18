"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../../diTokens");
const MessageTypes_1 = require("../../../lingo/message/MessageTypes");
class MessageToTMDeserializer {
    deserialize(serializedBatchedMessagesToTM) {
        const protocolVersion = serializedBatchedMessagesToTM[0];
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        const serializedMessagesToTM = serializedBatchedMessagesToTM[3];
        const agtSharingMessageId = serializedBatchedMessagesToTM[2];
        return {
            protocolVersion,
            targetAgtTerminalIds: serializedBatchedMessagesToTM[1],
            agtSharingMessageId,
            messages: serializedMessagesToTM.map(this.deserializeAMessage)
        };
    }
    deserializeAMessage(serializedMessageToTM) {
        const contentType = serializedMessageToTM[0];
        switch (contentType) {
            case MessageTypes_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                return {
                    contentType,
                    // agtRepositoryTransactionBlockId: serializedMessageToTM[1],
                    // sourceTerminalId: serializedMessageToTM[2],
                    // agtRepositoryId: serializedMessageToTM[3],
                    // addDatetime: serializedMessageToTM[4],
                    repositoryTransactionBlock: serializedMessageToTM[1]
                };
            }
            case MessageTypes_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                const syncOutcomes = this.deserializeSyncOutcomes(serializedMessageToTM[2]);
                return {
                    contentType,
                    tmSharingMessageId: serializedMessageToTM[1],
                    // terminalSyncLogId: serializedMessageToTM[2],
                    // agtRepositoryTransactionBlockAddDatetime: serializedMessageToTM[2],
                    syncOutcomes
                };
            }
            // case MessageToTMContentType.SYNC_ACK: {
            // 	const syncOutcomes: RepoTransBlockSyncOutcome[] = this.deserializeSyncOutcomes(
            // 		(<SerializedSyncNotificationMessageToTM>serializedMessageToTM)[4]);
            // 	return <SyncAcknowledgementMessageToTM>{
            // 		contentType,
            // 		tmSharingMessageIds: serializedMessageToTM[1]
            // 	}
            // }
            default: {
                throw new Error('Invalid MessageToTMContentType: ' + contentType);
            }
        }
    }
    deserializeSyncOutcomes(serializedRepoTransBlockSyncOutcome) {
        return serializedRepoTransBlockSyncOutcome.map((serializedSyncOutcome) => ({
            tmRepositoryTransactionBlockId: serializedSyncOutcome[0],
            agtRepositoryTransactionBlockId: serializedSyncOutcome[1],
            syncStatus: serializedSyncOutcome[2],
        }));
    }
}
exports.MessageToTMDeserializer = MessageToTMDeserializer;
di_1.DI.set(diTokens_1.MESSAGE_TO_TM_DESERIALIZER, MessageToTMDeserializer);
//# sourceMappingURL=MessageToTMDeserializer.js.map