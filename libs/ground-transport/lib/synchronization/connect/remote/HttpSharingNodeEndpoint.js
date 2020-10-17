import { MESSAGE_FROM_TM_SERIALIZER, MESSAGE_TO_TM_DESERIALIZER, MESSAGE_TO_TM_VERIFIER } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { HTTP_SHARING_NODE_ENDPOINT, } from '../../../tokens';
// const log = GROUND_TRANSPORT_LOGGER.add('HttpSharingNodeEndpoint')
/**
 * P2P endpoint to a built-in AGT
 */
export class HttpSharingNodeEndpoint {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    async communicateWithAGT(sharingNode, message) {
        const [messageFromTMSerializer, messageToTMDeserializer, messageToTMVerifier] = await container(this).get(MESSAGE_FROM_TM_SERIALIZER, MESSAGE_TO_TM_DESERIALIZER, MESSAGE_TO_TM_VERIFIER);
        const serializedMessageFromTM = messageFromTMSerializer.serialize(message);
        return new Promise((resolve, reject) => {
            this.xhr.open('PUT', this.agtUrl, true);
            const _self = this;
            this.xhr.onload = function () {
                const stringBatchedMessagesToTM = this.responseText;
                try {
                    const serializedBatchedMessagesToTM = JSON.parse(stringBatchedMessagesToTM);
                    const schemaValidationResult = messageToTMVerifier.verifyMessagesBatch(serializedBatchedMessagesToTM);
                    const connectionDataError = schemaValidationResult[0];
                    if (connectionDataError) {
                        console.error(`
	Message to TM validation error:
		Invalid sync message data schema:
				Error Code:    ${connectionDataError},
				Evaluation:    ${schemaValidationResult[1]}
				Message index: ${schemaValidationResult[2]}
				Data index:    ${schemaValidationResult[3]}
				`);
                        reject(new Error('Message to TM validation error:\n\t\tInvalid sync message data schema'));
                    }
                    const batchedMessagesToTM = messageToTMDeserializer.deserialize(serializedBatchedMessagesToTM);
                    resolve(batchedMessagesToTM);
                }
                catch (e) {
                    reject(e);
                }
            };
            this.xhr.send(serializedMessageFromTM);
        });
    }
}
DI.set(HTTP_SHARING_NODE_ENDPOINT, HttpSharingNodeEndpoint);
//# sourceMappingURL=HttpSharingNodeEndpoint.js.map