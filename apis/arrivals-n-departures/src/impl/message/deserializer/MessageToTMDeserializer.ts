import {DI}                         from '@airport/di'
import {MESSAGE_TO_TM_DESERIALIZER} from '../../../tokens'
import {
	BatchedMessagesToTM,
	MessageToTM,
	RepoTransBlockMessageToTM,
	RepoTransBlockSyncStatus,
	SyncNotificationMessageToTM
}                                   from '../../../lingo/message/MessageToTM'
import {MessageToTMContentType}     from '../../../lingo/message/MessageTypes'
import {
	SerializedBatchedMessagesToTM,
	SerializedMessageToTM,
	SerializedRepoTransBlockSyncStatus,
	SerializedSyncNotificationMessageToTM
}                                   from '../../../lingo/message/SerializedMessageToTM'

export interface IMessageToTMDeserializer {

	deserialize(
		serializedMessageToTM: SerializedBatchedMessagesToTM
	): BatchedMessagesToTM;

}

export class MessageToTMDeserializer
	implements IMessageToTMDeserializer {

	deserialize(
		serializedBatchedMessagesToTM: SerializedBatchedMessagesToTM
	): BatchedMessagesToTM {
		const protocolVersion = serializedBatchedMessagesToTM[0]
		if (protocolVersion !== 0) {
			throw new Error(`Unsupported TmToAgtProtocolVersion: ${protocolVersion}`)
		}
		const serializedMessagesToTM = serializedBatchedMessagesToTM[3]

		const agtSharingMessageId = serializedBatchedMessagesToTM[2]

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
		const contentType = serializedMessageToTM[0]
		switch (contentType) {
			case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
				return <RepoTransBlockMessageToTM>{
					contentType,
					// agtRepositoryTransactionBlockId: serializedMessageToTM[1],
					// sourceTerminalId: serializedMessageToTM[2],
					// agtRepositoryId: serializedMessageToTM[3],
					// addDatetime: serializedMessageToTM[4],
					repositoryTransactionBlock: serializedMessageToTM[1]
				}
			}
			case MessageToTMContentType.SYNC_NOTIFICATION: {
				const syncOutcomes: RepoTransBlockSyncStatus[] = this.deserializeSyncOutcomes(
					(<SerializedSyncNotificationMessageToTM>serializedMessageToTM)[2])
				return <SyncNotificationMessageToTM>{
					contentType,
					tmSharingMessageId: serializedMessageToTM[1],
					// terminalSyncLogId: serializedMessageToTM[2],
					// agtRepositoryTransactionBlockAddDatetime: serializedMessageToTM[2],
					syncOutcomes
				}
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
				throw new Error('Invalid MessageToTMContentType: ' + contentType)
			}
		}
	}

	private deserializeSyncOutcomes(
		serializedRepoTransBlockSyncOutcome: SerializedRepoTransBlockSyncStatus[]
	): RepoTransBlockSyncStatus[] {
		return serializedRepoTransBlockSyncOutcome.map((
			serializedSyncOutcome: SerializedRepoTransBlockSyncStatus
		) => (<RepoTransBlockSyncStatus>{
			tmRepositoryTransactionBlockId: serializedSyncOutcome[0],
			agtRepositoryTransactionBlockId: serializedSyncOutcome[1],
			syncStatus: serializedSyncOutcome[2],
		}))
	}

}

DI.set(MESSAGE_TO_TM_DESERIALIZER, MessageToTMDeserializer)
