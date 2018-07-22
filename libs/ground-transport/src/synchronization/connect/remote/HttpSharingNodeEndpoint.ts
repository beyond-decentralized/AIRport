import {
	BatchedMessagesToTM,
	IMessageFromTMSerializer,
	IMessageToTMDeserializer,
	IMessageToTMVerifier,
	MessageFromTM,
	MessageFromTMSerializerToken,
	MessageToTMDeserializerToken,
	MessageToTMVerifierToken,
	SerializedBatchedMessagesToTM
}                             from "@airport/arrivals-n-departures";
import {ISharingNode}         from "@airport/moving-walkway";
import {
	Inject,
	Service
}                             from "typedi";
import {
	GroundTransportLogger,
	HttpSharingNodeEndpointToken,
}                             from "../../../InjectionTokens";
import {ISharingNodeEndpoint} from "../SharingNodeEndpoint";

const log = GroundTransportLogger.add('HttpSharingNodeEndpoint');

/**
 * P2P endpoint to a built-in AGT
 */
@Service(HttpSharingNodeEndpointToken)
export class HttpSharingNodeEndpoint
	implements ISharingNodeEndpoint {

	xhr = new XMLHttpRequest();
	agtUrl: string;

	constructor(
		@Inject(MessageFromTMSerializerToken)
		private messageFromTMSerializer: IMessageFromTMSerializer,
		@Inject(MessageToTMDeserializerToken)
		private messageToTMDeserializer: IMessageToTMDeserializer,
		@Inject(MessageToTMVerifierToken)
		private messageToTMVerifier: IMessageToTMVerifier,
	) {
	}

	async communicateWithAGT(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<BatchedMessagesToTM> {
		const serializedMessageFromTM = this.messageFromTMSerializer.serialize(message);

		return new Promise<BatchedMessagesToTM>((
			resolve: (batchedMessages: BatchedMessagesToTM) => void,
			reject
		) => {
			this.xhr.open('PUT', this.agtUrl, true);
			const _self = this;
			this.xhr.onload = function () {
				const stringBatchedMessagesToTM = this.responseText;
				try {
					const serializedBatchedMessagesToTM: SerializedBatchedMessagesToTM
						= JSON.parse(stringBatchedMessagesToTM);
					const schemaValidationResult = _self.messageToTMVerifier.verifyMessagesBatch(serializedBatchedMessagesToTM);

					const connectionDataError = schemaValidationResult[0];
					if (connectionDataError) {
						log.error(`
	Message to TM validation error:
		Invalid sync message data schema:
				Error Code:    {1}
				Evaluation:    {2}
				Message index: {3}
				Data index:    {4}
				`,
							connectionDataError,
							schemaValidationResult[1],
							schemaValidationResult[2]
						);
						reject(new Error('Message to TM validation error:\n\t\tInvalid sync message data schema'));
					}
					const batchedMessagesToTM = _self.messageToTMDeserializer.deserialize(serializedBatchedMessagesToTM);
					resolve(batchedMessagesToTM);
				} catch (e) {
					reject(e);
				}
			};
			this.xhr.send(serializedMessageFromTM);
		});
	}

}