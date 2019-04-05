import {
	BatchedMessagesToTM,
	IMessageFromTMSerializer,
	IMessageToTMDeserializer,
	IMessageToTMVerifier,
	MESSAGE_FROM_TM_SERIALIZER,
	MESSAGE_TO_TM_DESERIALIZER,
	MESSAGE_TO_TM_VERIFIER,
	MessageFromTM,
	SerializedBatchedMessagesToTM
}                                    from '@airport/arrivals-n-departures'
import {DI}                          from '@airport/di'
import {ISharingNode}                from '@airport/moving-walkway'
import {HTTP_SHARING_NODE_ENDPOINT,} from '../../../diTokens'
import {ISharingNodeEndpoint}        from '../SharingNodeEndpoint'

// const log = GROUND_TRANSPORT_LOGGER.add('HttpSharingNodeEndpoint')

/**
 * P2P endpoint to a built-in AGT
 */
export class HttpSharingNodeEndpoint
	implements ISharingNodeEndpoint {

	xhr = new XMLHttpRequest()
	agtUrl: string

	private messageFromTMSerializer: IMessageFromTMSerializer
	private messageToTMDeserializer: IMessageToTMDeserializer
	private messageToTMVerifier: IMessageToTMVerifier

	constructor() {
		DI.get((
			messageFromTMSerializer,
			messageToTMDeserializer,
			messageToTMVerifier
			) => {
				this.messageFromTMSerializer = messageFromTMSerializer
				this.messageToTMDeserializer = messageToTMDeserializer
				this.messageToTMVerifier     = messageToTMVerifier
			}, MESSAGE_FROM_TM_SERIALIZER, MESSAGE_TO_TM_DESERIALIZER,
			MESSAGE_TO_TM_VERIFIER)
	}

	async communicateWithAGT(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<BatchedMessagesToTM> {
		const serializedMessageFromTM = this.messageFromTMSerializer.serialize(message)

		return new Promise<BatchedMessagesToTM>((
			resolve: (batchedMessages: BatchedMessagesToTM) => void,
			reject
		) => {
			this.xhr.open('PUT', this.agtUrl, true)
			const _self     = this
			this.xhr.onload = function () {
				const stringBatchedMessagesToTM = this.responseText
				try {
					const serializedBatchedMessagesToTM: SerializedBatchedMessagesToTM
						                           = JSON.parse(stringBatchedMessagesToTM)
					const schemaValidationResult = _self.messageToTMVerifier.verifyMessagesBatch(serializedBatchedMessagesToTM)

					const connectionDataError = schemaValidationResult[0]
					if (connectionDataError) {
						console.error(`
	Message to TM validation error:
		Invalid sync message data schema:
				Error Code:    ${connectionDataError},
				Evaluation:    ${schemaValidationResult[1]}
				Message index: ${schemaValidationResult[2]}
				Data index:    ${schemaValidationResult[3]}
				`)
						reject(new Error('Message to TM validation error:\n\t\tInvalid sync message data schema'))
					}
					const batchedMessagesToTM = _self.messageToTMDeserializer.deserialize(serializedBatchedMessagesToTM)
					resolve(batchedMessagesToTM)
				} catch (e) {
					reject(e)
				}
			}
			this.xhr.send(serializedMessageFromTM)
		})
	}

}

DI.set(HTTP_SHARING_NODE_ENDPOINT, HttpSharingNodeEndpoint)
