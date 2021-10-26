import { encryptString, decryptString } from 'string-cipher';
import { ServerError } from '@airport/nonhub-types';
const axios = require('axios');
export async function processBatchRequests(getBatch, getCurrentBatch, masterKey, requestHost, respond) {
    const lastBatch = getBatch();
    if (!lastBatch.requestData.records.length) {
        return;
    }
    // const currentBatch = getCurrentBatch()
    let received = true;
    let response;
    try {
        const ecryptedMessage = await encryptString(JSON.stringify(lastBatch.requestData), masterKey);
        response = await axios.put(requestHost, ecryptedMessage);
    }
    catch (e) {
        received = false;
    }
    if (!received) {
        for (let uuid in lastBatch.replyContexts) {
            lastBatch.replyContexts[uuid].replyHandle.send({
                received: false
            });
        }
        return;
    }
    let responseData;
    try {
        const decryptedMessage = await decryptString(response, masterKey);
        responseData = JSON.parse(decryptedMessage);
    }
    catch (e) {
        received = false;
    }
    if (!received || responseData.error) {
        switch (responseData.error) {
            case ServerError.DATABASE:
            case ServerError.SHUTDOWN:
            /* TODO: consider retrying in the future
                // Probably a temporary outage - re-try
                for (let uuid in lastBatch.replies) {
                    currentBatch.replies[uuid] = {
                        responded: false,
                        reply: lastBatch.replies[uuid].reply
                    }
                }
                currentBatch.data.records = currentBatch.data.records.concat(
                    lastBatch.data.records
                )
                break */
            default:
                for (let uuid in lastBatch.replyContexts) {
                    lastBatch.replyContexts[uuid].replyHandle.send({
                        received: false
                    });
                }
                break;
        }
        return;
    }
    respond(lastBatch, responseData);
}
export function respondToReads(requestBatch, response) {
    // Group reply contexts by repository id (duplicates possible)
    const replyContextsByRepositoryId = new Map();
    for (const record of requestBatch.requestData.records) {
        const replyContext = requestBatch.replyContexts[record.uuid];
        for (const read of record.reads) {
            let replyContextsForRepositoryId = replyContextsByRepositoryId.get(read.repositoryId);
            if (!replyContextsForRepositoryId) {
                replyContextsForRepositoryId = new Set();
                replyContextsByRepositoryId.set(read.repositoryId, replyContextsForRepositoryId);
            }
            replyContextsForRepositoryId.add(replyContext);
        }
    }
    // Add transactionLogs records to each reply context
    for (let repositoryId in response.results) {
        const transactionLogs = response.results[repositoryId];
        const replyContextsForRepositoryId = replyContextsByRepositoryId.get(repositoryId);
        for (const replyContext of replyContextsForRepositoryId) {
            replyContext.records.push(transactionLogs);
        }
    }
    // Send data back
    for (let uuid in requestBatch.replyContexts) {
        let replyContext = requestBatch.replyContexts[uuid];
        replyContext.replyHandle.send({
            received: true,
            records: replyContext.records,
        });
        replyContext.responded = true;
    }
    // Handle any requests that haven't been responded to
    for (let uuid in requestBatch.replyContexts) {
        let replyContext = requestBatch.replyContexts[uuid];
        if (!replyContext.responded) {
            replyContext.replyHandle.send({
                received: false
            });
        }
    }
}
export function respondToWrites(requestBatch, response) {
}
export function genericRespond(requestBatch, response) {
    for (let uuid in response.results) {
        let replyToClientContext = requestBatch.replyContexts[uuid];
        if (replyToClientContext) {
            replyToClientContext.replyHandle.send({
                received: response.results[uuid]
            });
            replyToClientContext.responded = true;
        }
    }
    for (let uuid in requestBatch.replyContexts) {
        let clientConnection = requestBatch.replyContexts[uuid];
        if (!clientConnection.responded) {
            clientConnection.replyHandle.send({
                received: false
            });
        }
    }
}
//# sourceMappingURL=batchProcessors.js.map