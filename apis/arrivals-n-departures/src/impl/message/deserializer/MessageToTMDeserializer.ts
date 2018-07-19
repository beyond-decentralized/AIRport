import {Service}                      from "typedi";
import {MessageToTMDeserializerToken} from "../../../InjectionTokens";
import {
	BatchedMessagesToTM,
	MessageToTM,
	RepoTransBlockMessageToTM,
	RepoTransBlockSyncOutcome,
	SyncNotificationMessageToTM
}                                     from "../../../lingo/message/MessageToTM";
import {MessageToTMContentType}       from "../../../lingo/message/MessageTypes";
import {
	SerializedBatchedMessagesToTM,
	SerializedMessageToTM,
	SerializedRepoTransBlockSyncOutcome,
	SerializedSyncNotificationMessageToTM
}                                     from "../../../lingo/message/SerializedMessageToTM";

export interface IMessageToTMDeserializer {

	deserialize(
		serializedMessageToTM: SerializedBatchedMessagesToTM
	): BatchedMessagesToTM;

}

@Service(MessageToTMDeserializerToken)
export class MessageToTMDeserializer
	implements IMessageToTMDeserializer {

	deserialize(
		serializedBatchedMessagesToTM: SerializedBatchedMessagesToTM
	): BatchedMessagesToTM {
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
		}
	}

	deserializeAMessage(
		serializedMessageToTM: SerializedMessageToTM
	): MessageToTM {
		const contentType = serializedMessageToTM[0];
		switch (contentType) {
			case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
				return <RepoTransBlockMessageToTM>{
					contentType,
					// agtRepositoryTransactionBlockId: serializedMessageToTM[1],
					// sourceTerminalId: serializedMessageToTM[2],
					// agtRepositoryId: serializedMessageToTM[3],
					// addDatetime: serializedMessageToTM[4],
					repositoryTransactionBlock: serializedMessageToTM[1]
				};
			}
			case MessageToTMContentType.SYNC_NOTIFICATION: {
				const syncOutcomes: RepoTransBlockSyncOutcome[] = this.deserializeSyncOutcomes(
					(<SerializedSyncNotificationMessageToTM>serializedMessageToTM)[2]);
				return <SyncNotificationMessageToTM>{
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

	private deserializeSyncOutcomes(
		serializedRepoTransBlockSyncOutcome: SerializedRepoTransBlockSyncOutcome[]
	): RepoTransBlockSyncOutcome[] {
		return serializedRepoTransBlockSyncOutcome.map((
			serializedSyncOutcome: SerializedRepoTransBlockSyncOutcome
		) => (<RepoTransBlockSyncOutcome>{
			tmRepositoryTransactionBlockId: serializedSyncOutcome[0],
			agtRepositoryTransactionBlockId: serializedSyncOutcome[1],
			syncOutcomeType: serializedSyncOutcome[2],
		}));
	}

}