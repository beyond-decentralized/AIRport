"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../../diTokens");
const lingo_1 = require("../../../lingo/lingo");
class MessageToTMSerializer {
    serialize(batchedMessagesToTM) {
        const protocolVersion = batchedMessagesToTM.protocolVersion;
        if (protocolVersion !== 0) {
            throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`);
        }
        return [0,
            batchedMessagesToTM.targetAgtTerminalIds,
            batchedMessagesToTM.agtSharingMessageId,
            batchedMessagesToTM.messages.map(this.serializeAMessage)
        ];
    }
    serializeAMessage(messageToTM) {
        switch (messageToTM.contentType) {
            case lingo_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                return [
                    messageToTM.contentType,
                    // messageToTM.agtRepositoryTransactionBlockId,
                    // messageToTM.sourceTerminalId,
                    // messageToTM.agtRepositoryId,
                    // messageToTM.addDatetime,
                    // messageToTM.tmRepositoryTransactionBlockId,
                    messageToTM.repositoryTransactionBlock
                ];
            }
            case lingo_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                const serializedSyncOutcomes = this.serializeSyncOutcomes(messageToTM.syncOutcomes);
                return [
                    messageToTM.contentType,
                    messageToTM.tmSharingMessageId,
                    // messageToTM.terminalSyncLogId,
                    // messageToTM.agtRepositoryTransactionBlockAddDatetime,
                    serializedSyncOutcomes
                ];
            }
            // case MessageToTMContentType.SYNC_ACK: {
            // 	const serializedSyncOutcomes = this.serializeSyncOutcomes(
            // 		messageToTM.syncOutcomes);
            // 	return <SerializedSyncAcknowledgementMessageToTM>[
            // 		messageToTM.contentType,
            // 		serializedSyncOutcomes
            // 	];
            // }
            case lingo_1.MessageToTMContentType.ALIVE_ACK: {
                return [
                    messageToTM.contentType
                ];
            }
            default: {
                throw new Error('Unknown MessageToTMContentType: ' +
                    messageToTM.contentType);
            }
        }
    }
    serializeSyncOutcomes(syncOutcomes) {
        return syncOutcomes.map((syncOutcome) => [
            syncOutcome.tmRepositoryTransactionBlockId,
            // syncOutcome.agtRepositoryTransactionBlockId,
            syncOutcome.syncStatus
        ]);
    }
}
exports.MessageToTMSerializer = MessageToTMSerializer;
di_1.DI.set(diTokens_1.MESSAGE_TO_TM_SERIALIZER, MessageToTMSerializer);
//# sourceMappingURL=MessageToTMSerializer.js.map