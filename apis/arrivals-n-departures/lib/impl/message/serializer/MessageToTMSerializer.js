import { DI } from '@airport/di';
import { MESSAGE_TO_TM_SERIALIZER } from '../../../tokens';
import { MessageToTMContentType } from '../../../lingo/lingo';
export class MessageToTMSerializer {
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
            case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
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
            case MessageToTMContentType.SYNC_NOTIFICATION: {
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
            case MessageToTMContentType.ALIVE_ACK: {
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
DI.set(MESSAGE_TO_TM_SERIALIZER, MessageToTMSerializer);
//# sourceMappingURL=MessageToTMSerializer.js.map