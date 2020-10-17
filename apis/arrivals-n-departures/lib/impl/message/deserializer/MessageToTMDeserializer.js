import { DI } from '@airport/di';
import { MESSAGE_TO_TM_DESERIALIZER } from '../../../tokens';
import { MessageToTMContentType } from '../../../lingo/message/MessageTypes';
export class MessageToTMDeserializer {
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
            case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                return {
                    contentType,
                    // agtRepositoryTransactionBlockId: serializedMessageToTM[1],
                    // sourceTerminalId: serializedMessageToTM[2],
                    // agtRepositoryId: serializedMessageToTM[3],
                    // addDatetime: serializedMessageToTM[4],
                    repositoryTransactionBlock: serializedMessageToTM[1]
                };
            }
            case MessageToTMContentType.SYNC_NOTIFICATION: {
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
DI.set(MESSAGE_TO_TM_DESERIALIZER, MessageToTMDeserializer);
//# sourceMappingURL=MessageToTMDeserializer.js.map