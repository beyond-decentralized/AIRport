import {Service}                    from "typedi";
import {MessageToTMSerializerToken} from "../../../InjectionTokens";
import {
	BatchedMessagesToTM,
	MessageToTM,
	MessageToTMContentType,
	SerializedAliveAcknowledgementMessageToTM,
	SerializedBatchedMessagesToTM,
	SerializedMessageToTM,
	SerializedRepoTransBlockMessageToTM,
	SerializedRepoTransBlockSyncOutcome,
	SerializedSyncNotificationMessageToTM
}                                   from "../../../lingo/lingo";
import {RepoTransBlockSyncOutcome}  from "../../../lingo/message/MessageToTM";

export interface IMessageToTMSerializer {

	serialize(
		messagesToTM: BatchedMessagesToTM
	): SerializedBatchedMessagesToTM;

	serializeAMessage(
		messageToTM: MessageToTM
	): SerializedMessageToTM;

}

@Service(MessageToTMSerializerToken)
export class MessageToTMSerializer
	implements IMessageToTMSerializer {

	serialize(
		batchedMessagesToTM: BatchedMessagesToTM
	): SerializedBatchedMessagesToTM {
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

	serializeAMessage(
		messageToTM: MessageToTM
	): SerializedMessageToTM {
		switch (messageToTM.contentType) {
			case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
				return <SerializedRepoTransBlockMessageToTM>[
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
				const serializedSyncOutcomes = this.serializeSyncOutcomes(
					messageToTM.syncOutcomes);
				return <SerializedSyncNotificationMessageToTM>[
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
				return <SerializedAliveAcknowledgementMessageToTM> [
					messageToTM.contentType
				];
			}
			default: {
				throw new Error('Unknown MessageToTMContentType: ' +
					(<MessageToTM>messageToTM).contentType);
			}
		}
	}

	private serializeSyncOutcomes(
		syncOutcomes: RepoTransBlockSyncOutcome[]
	): SerializedRepoTransBlockSyncOutcome[] {
		return syncOutcomes.map((
			syncOutcome
		) => <SerializedRepoTransBlockSyncOutcome>[
			syncOutcome.tmRepositoryTransactionBlockId,
			// syncOutcome.agtRepositoryTransactionBlockId,
			syncOutcome.syncOutcomeType
		]);
	}

}