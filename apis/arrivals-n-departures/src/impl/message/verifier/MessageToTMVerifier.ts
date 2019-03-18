import {DI}                            from '@airport/di'
import {MESSAGE_TO_TM_VERIFIER}        from '../../../diTokens'
import {
	MessageToTMContentType,
	MessageToTMError,
	SerializedBatchedMessagesToTM,
	SerializedMessageToTM,
	SerializedRepoTransBlockMessageToTM,
	SerializedRepoTransBlockSyncStatus,
	SerializedSyncNotificationMessageToTM,
	SharingNodeRepoTransBlockSyncStatus,
	TerminalId
}                                      from '../../../lingo/lingo'
import {AbstractCommonMessageVerifier} from './AbstractCommonMessageVerifier'

export interface IMessageToTMVerifier {

	verifyMessagesBatch(
		batchedMessages: SerializedBatchedMessagesToTM
	): [MessageToTMError, any] | [MessageToTMError, any, any] | [MessageToTMError, any, any, any];

}

export class MessageToTMVerifier
	extends AbstractCommonMessageVerifier
	implements IMessageToTMVerifier {

	verifyMessagesBatch(
		batchedMessages: SerializedBatchedMessagesToTM
	): [MessageToTMError, any] | [MessageToTMError, any, any] | [MessageToTMError, any, any, any] {
		if (!(batchedMessages instanceof Array)) {
			return [MessageToTMError.MESSAGES_BATCH_IS_NOT_ARRAY, typeof batchedMessages]
		}
		if (batchedMessages.length !== 4) {
			return [MessageToTMError.WRONG_MESSAGES_BATCH_LENGTH, batchedMessages.length]
		}

		let error: any = this.verifyBatchHeader(batchedMessages)

		if (error) {
			return error
		}

		const messages: SerializedMessageToTM[] = batchedMessages[3]
		if (!(messages instanceof Array)) {
			return [MessageToTMError.MESSAGES_IS_NOT_ARRAY, typeof batchedMessages]
		}
		// It is OK for a reply not to have any data in it
		// if (!messages.length) {
		// 	return [MessageToTMError.NO_MESSAGES_IN_ARRAY, messages.length];
		// }

		messages.some((
			message,
			index
		) => {
			error = this.verifyMessage(message, index)
			return !!error
		})

		if (error) {
			return error
		}

		return [MessageToTMError.NO_DATA_ERROR, null]
	}

	verifyBatchHeader(
		batchedMessages: SerializedBatchedMessagesToTM
	): [MessageToTMError, any] | [MessageToTMError, any, any] {

		let error: any = this.verifyMessageProtocol(batchedMessages[0], MessageToTMError)
		if (error) {
			return <[MessageToTMError, any]>error
		}

		const targetTerminalIds = batchedMessages[1]

		if (!(targetTerminalIds instanceof Array)) {
			return [MessageToTMError.TARGET_AGT_DATABASE_IDS_IS_NOT_ARRAY, typeof batchedMessages]
		}

		targetTerminalIds.some((
			targetTerminalId: TerminalId,
			index
		) => {
			if (typeof targetTerminalId !== 'number') {
				error = [MessageToTMError.TARGET_AGT_DATABASE_ID_IS_NOT_NUMBER,
					typeof targetTerminalId, index]
				return true
			}
			if (targetTerminalId < 1) {
				error = [MessageToTMError.TARGET_AGT_DATABASE_ID_IS_INVALID_NUMBER,
					targetTerminalId, index]
				return true
			}
		})

		const agtSharingMessageId = batchedMessages[2]
		if (typeof agtSharingMessageId !== 'number') {
			return [MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_NOT_NUMBER,
				typeof agtSharingMessageId]
		}
		if (agtSharingMessageId < 1) {
			return [MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_INVALID_NUMBER,
				agtSharingMessageId]
		}

		return <[MessageToTMError, any]>error
	}

	verifyMessage(
		message: SerializedMessageToTM,
		index: number
	): [MessageToTMError, any, any] | [MessageToTMError, any, any, any] | void {
		const error = this.verifyMessageHeader(
			message, 0, MessageToTMError, index)
		if (error) {
			return <[MessageToTMError, any, any]>error
		}

		const contentType: MessageToTMContentType = message[0]
		switch (contentType) {
			case MessageToTMContentType.SYNC_NOTIFICATION:
				return this.verifySyncNotificationMessage(
					<SerializedSyncNotificationMessageToTM>message, index)
			case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK:
				return this.verifyRepoTransBlockMessage(
					<SerializedRepoTransBlockMessageToTM>message, index)
			case MessageToTMContentType.ALIVE_ACK:
				// FIXME: implement
				return [MessageToTMError.UNSUPPORTED_CONTENT_TYPE, contentType, index]
			default:
				return [MessageToTMError.WRONG_CONTENT_TYPE, contentType, index]
		}
	}

	verifySyncNotificationMessage(
		message: SerializedSyncNotificationMessageToTM,
		index: number
	): [MessageToTMError, any, any] | [MessageToTMError, any, any, any] | void {
		if (typeof message[1] !== 'number') {
			return [MessageToTMError.TM_SHARING_MESSAGE_ID_IS_NOT_NUMBER, typeof message[1], index]
		}
		// if (typeof message[2] !== 'number') {
		// 	return [MessageToTMError.AGT_DATABASE_SYNC_LOG_ID_IS_NOT_NUMBER, typeof
		// message[2], index]; } if (typeof message[2] !== 'number') { return
		// [MessageToTMError.AGT_SYNC_RECORD_ADD_DATETIME_IS_NOT_NUMBER, typeof message[2],
		// index]; }
		let error
		message[2].some((
			syncOutcome: SerializedRepoTransBlockSyncStatus,
			syncOutcomeIndex
		) => {
			if (typeof syncOutcome[0] !== 'number') {
				error = [MessageToTMError.TM_REPOSITORY_TRANSACTION_BLOCK_ID_IS_NOT_NUMBER,
					typeof syncOutcome[0], index, syncOutcomeIndex]
				return true
			}
			if (typeof syncOutcome[1] !== 'number') {
				error = [MessageToTMError.AGT_SYNC_RECORD_ID_IS_NOT_NUMBER,
					typeof syncOutcome[1], index, syncOutcomeIndex]
				return true
			}
			switch (syncOutcome[2]) {
				case SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_ALREADY_SYNCED:
				case SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_NO_WRITE_PERMISSION:
				case SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_DATABASE_NOT_FOUND:
				case SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_DENIED_REPOSITORY_NOT_FOUND:
				case SharingNodeRepoTransBlockSyncStatus.AGT_STATUS_RTB_SYNC_SUCCESSFUL:
					break
				default:
					error = [MessageToTMError.WRONG_REPO_TRANS_BLOCK_SYNC_OUTCOME_TYPE,
						typeof syncOutcome[1], index, syncOutcomeIndex]
					return true
			}
		})

		return error // may be void
	}

	verifyRepoTransBlockMessage(
		message: SerializedRepoTransBlockMessageToTM,
		index: number
	): [MessageToTMError, any, any] | void {
		if (typeof message[1] !== 'number') {
			return [MessageToTMError.AGT_SYNC_RECORD_ID_IS_NOT_NUMBER, typeof message[1], index]
		}
		if (typeof message[2] !== 'number') {
			return [MessageToTMError.AGT_DATABASE_ID_IS_NOT_NUMBER, typeof message[2], index]
		}
		if (typeof message[3] !== 'number') {
			return [MessageToTMError.AGT_REPOSITORY_ID_IS_NOT_NUMBER, typeof message[3], index]
		}
		if (typeof message[4] !== 'number') {
			return [MessageToTMError.AGT_SYNC_RECORD_ADD_DATETIME_IS_NOT_NUMBER,
				message[4], index]
		}
		if (typeof message[5] !== 'string') {
			return [MessageToTMError.AGT_SYNC_RECORD_REPOSITORY_TRANSACTION_BLOCK_IS_NOT_STRING,
				message[5], index]
		}
	}

}

DI.set(MESSAGE_TO_TM_VERIFIER, MessageToTMVerifier)
