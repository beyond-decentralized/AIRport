"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../../diTokens");
// const log = GROUND_TRANSPORT_LOGGER.add('HttpSharingNodeEndpoint')
/**
 * P2P endpoint to a built-in AGT
 */
class HttpSharingNodeEndpoint {
    constructor() {
        this.xhr = new XMLHttpRequest();
        di_1.DI.get((messageFromTMSerializer, messageToTMDeserializer, messageToTMVerifier) => {
            this.messageFromTMSerializer = messageFromTMSerializer;
            this.messageToTMDeserializer = messageToTMDeserializer;
            this.messageToTMVerifier = messageToTMVerifier;
        }, arrivals_n_departures_1.MESSAGE_FROM_TM_SERIALIZER, arrivals_n_departures_1.MESSAGE_TO_TM_DESERIALIZER, arrivals_n_departures_1.MESSAGE_TO_TM_VERIFIER);
    }
    async communicateWithAGT(sharingNode, message) {
        const serializedMessageFromTM = this.messageFromTMSerializer.serialize(message);
        return new Promise((resolve, reject) => {
            this.xhr.open('PUT', this.agtUrl, true);
            const _self = this;
            this.xhr.onload = function () {
                const stringBatchedMessagesToTM = this.responseText;
                try {
                    const serializedBatchedMessagesToTM = JSON.parse(stringBatchedMessagesToTM);
                    const schemaValidationResult = _self.messageToTMVerifier.verifyMessagesBatch(serializedBatchedMessagesToTM);
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
                    const batchedMessagesToTM = _self.messageToTMDeserializer.deserialize(serializedBatchedMessagesToTM);
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
exports.HttpSharingNodeEndpoint = HttpSharingNodeEndpoint;
di_1.DI.set(diTokens_1.HTTP_SHARING_NODE_ENDPOINT, HttpSharingNodeEndpoint);
//# sourceMappingURL=HttpSharingNodeEndpoint.js.map