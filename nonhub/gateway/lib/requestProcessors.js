import { encryptString, decryptString } from 'string-cipher';
import { v4 as uuidv4 } from "uuid";
const axios = require('axios');
let minimumTimestamp = new Date('2021-12-31T23:59:59').getTime();
export function processReadRequest(request, reply, currentReadBatch) {
    let readRequest = request.body;
    if (!readRequest) {
        reply.send({ received: false });
        return;
    }
    const senderUuid = readRequest.senderUuid;
    if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
        reply.send({ received: false });
        return;
    }
    const reads = readRequest.reads;
    if (!(reads instanceof Array)) {
        reply.send({ received: false });
        return;
    }
    let isValid = true;
    reads.forEach(read => {
        if (!read
            || !(read.sinceTime === null || (typeof read.sinceTime === 'number'
                && read.sinceTime > minimumTimestamp))
            || typeof read.repositoryId !== 'string' || read.repositoryId.length !== 36) {
            isValid = false;
        }
    });
    if (!isValid) {
        reply.send({ received: false });
        return;
    }
    const uuid = uuidv4();
    currentReadBatch.replyContexts[uuid] = {
        records: [],
        replyHandle: reply,
        responded: false,
    };
    currentReadBatch.requestData.records.push({
        reads,
        senderUuid,
        uuid
    });
}
export function processSearchRequest(request, reply, currentSearchBatch) {
    let searchRequest = request.body;
    if (!searchRequest) {
        reply.send({ received: false });
        return;
    }
    let senderUuid = searchRequest.senderUuid;
    if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
        reply.send({ received: false });
        return;
    }
    let searchTerm = searchRequest.searchTerm;
    if (typeof searchTerm !== 'string' || searchTerm.length < 5 || searchTerm.length > 120) {
        reply.send({ received: false });
        return;
    }
    const uuid = uuidv4();
    currentSearchBatch.replyContexts[uuid] = {
        responded: false,
        replyHandle: reply
    };
    currentSearchBatch.requestData.records.push({
        senderUuid,
        searchTerm,
        uuid: uuidv4()
    });
}
export function processUserRequest(request, reply, currentUserBatch) {
    let userRequest = request.body;
    if (!userRequest) {
        reply.send({ received: false });
        return;
    }
    // This is the proposed private UUID, reply will contain a public UUID
    let senderUuid = userRequest.senderUuid;
    if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
        reply.send({ received: false });
        return;
    }
    let username = userRequest.username;
    if (typeof username !== 'string' || username.length < 3 || username.length > 36) {
        reply.send({ received: false });
        return;
    }
    const uuid = uuidv4();
    currentUserBatch.replyContexts[uuid] = {
        responded: false,
        replyHandle: reply
    };
    currentUserBatch.requestData.records.push({
        senderUuid,
        username,
        uuid: uuidv4()
    });
}
export function processWriteRequest(request, reply, masterKey, requestHost) {
    processWriteRequestAsync(request, reply, masterKey, requestHost).then();
}
async function processWriteRequestAsync(request, reply, masterKey, requestHost) {
    let writeRequest = request.body;
    if (!writeRequest) {
        reply.send({ received: false });
        return;
    }
    let senderUuid = writeRequest.senderUuid;
    if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
        reply.send({ received: false });
        return;
    }
    if (writeRequest.category !== 'FromClient') {
        reply.send({ received: false });
        return;
    }
    let received = true;
    let response;
    try {
        const ecryptedMessage = await encryptString(JSON.stringify(writeRequest), masterKey);
        response = await axios.put(requestHost, ecryptedMessage);
    }
    catch (e) {
        received = false;
    }
    if (!received) {
        reply.send({
            received: false
        });
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
    if (!received || !responseData.received) {
        reply.send({ received: false });
        return;
    }
    reply.send({
        ...responseData,
        received: true
    });
}
//# sourceMappingURL=requestProcessors.js.map