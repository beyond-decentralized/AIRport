import { encryptString, decryptString } from 'string-cipher';
import { v4 as uuidv4 } from "uuid";
const axios = require('axios');
let minimumTimestamp = new Date('2021-12-31T23:59:59').getTime();
const EARLIEST_BIRTH_MONTH = Date.UTC(1900, 0);
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
export function processUserRequest(request, reply, masterKey) {
    const userRequest = request.body;
    const email = userRequest.email;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (typeof email !== 'string'
        || email.length > 64
        || !emailRegexp.test(email)) {
        reply.send({
            received: true,
            error: 'INVALID_EMAIL'
        });
        return;
    }
    const username = userRequest.userName;
    const usernameRegexp = /^\S*$/;
    if (typeof username !== 'string'
        || username.length < 3 || username.length > 32
        || !usernameRegexp.test(username)) {
        reply.send({
            received: true,
            error: 'INVALID_USERNAME'
        });
        return;
    }
    const now = new Date().getTime();
    const birthMonth = parseInt(userRequest.birthMonth);
    if (isNaN(birthMonth) || typeof birthMonth !== 'number'
        || birthMonth < EARLIEST_BIRTH_MONTH || birthMonth > now) {
        reply.send({
            received: true,
            error: 'INVALID_BIRTH_MONTH'
        });
        return;
    }
    const countryId = parseInt(userRequest.countryId);
    if (isNaN(countryId) || typeof countryId !== 'number'
        || countryId < 1 || countryId > 234) {
        reply.send({
            received: true,
            error: 'INVALID_COUNTRY'
        });
        return;
    }
    doProcessWriteRequestAsync({
        birthMonth,
        category: 'FromClient',
        countryId,
        email,
        senderUuid: null,
        username,
        uuid: uuidv4(),
    }, reply, masterKey, 'http://localhost:2345').then();
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
    await doProcessWriteRequestAsync(writeRequest, reply, masterKey, requestHost);
}
export async function doProcessWriteRequestAsync(writeRequest, reply, masterKey, requestHost) {
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