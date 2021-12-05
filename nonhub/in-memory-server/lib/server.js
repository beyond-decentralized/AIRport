"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserRequest = exports.processSearchRequest = exports.server = void 0;
const processor_common_1 = require("@airport/processor-common");
// var encryptionKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'
var encryptionKey = process.env.ENCRYPTION_KEY;
const EARLIEST_BIRTH_MONTH = Date.UTC(1900, 0);
exports.server = new processor_common_1.BasicServer({
    logger: false,
});
const transactionLogs = new Map();
exports.server.fastify.register(require('fastify-cors'), {
    origin: (origin, cb) => {
        if (!origin || /localhost/.test(origin)) {
            // Request from configured host or localhost (for testing) will pass
            cb(null, true);
            return;
        }
        cb(new Error('Not allowed CORS host'), false);
    }
});
exports.server.fastify.put('/read', (request, reply) => {
    serveReadRequest(request, reply, exports.server.serverState, encryptionKey);
});
exports.server.fastify.put('/write', (request, reply) => {
    serveWriteRequest(request, reply, exports.server.serverState, encryptionKey);
});
exports.server.fastify.put('/search', (request, reply) => {
    // TODO: implement
});
async function serveReadRequest(request, reply, serverState, encryptionKey) {
    if (serverState !== processor_common_1.ServerState.RUNNING) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }));
        return;
    }
    const readRequest = await processRequest(request);
    if (!readRequest) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }));
        return;
    }
    let transactionLog = transactionLogs.get(readRequest.repositoryUuId);
    if (!transactionLog || !transactionLog.length) {
        return [];
    }
    let results = transactionLog;
    if (readRequest.syncTimestamp) {
        results = [];
        for (let transactionLogEntry of transactionLog) {
            if (transactionLogEntry.syncTimestamp >= readRequest.syncTimestamp) {
                results.push(transactionLogEntry);
            }
        }
    }
    let packagedMessage = results.join('|');
    // if (encryptionKey) {
    //     packagedMessage = encryptStringSync(results.join('|'), encryptionKey)
    // }
    reply.send(packagedMessage);
}
async function processRequest(request) {
    try {
        let unpackagedMessage = request.body;
        // if (encryptionKey) {
        //     unpackagedMessage = await decryptString(request.body, encryptionKey)
        // }
        // console.log('Is object: ' + (typeof unpackagedMessage === 'object'))
        // return JSON.parse(unpackagedMessage)
        return unpackagedMessage;
    }
    catch (e) {
        console.error(e);
        console.log('Request:');
        console.log(request.body);
        return null;
    }
}
async function serveWriteRequest(request, reply, serverState, encryptionKey) {
    if (serverState !== processor_common_1.ServerState.RUNNING) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }));
        return;
    }
    const writeRequest = await processRequest(request);
    if (!writeRequest) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }));
        return;
    }
    const syncTimestamp = new Date().getTime();
    const readResponse = {
        ...writeRequest,
        syncTimestamp
    };
    let transactionLog = transactionLogs.get(writeRequest.repositoryUuId);
    if (!transactionLog) {
        transactionLog = [];
        transactionLogs.set(writeRequest.repositoryUuId, transactionLog);
    }
    transactionLog.push(readResponse);
    let packagedMessage = JSON.stringify({
        syncTimestamp
    });
    // if (encryptionKey) {
    //     packagedMessage = encryptStringSync(
    //         packagedMessage, encryptionKey)
    // }
    reply.send(packagedMessage);
}
function processSearchRequest(request, reply) {
    let searchRequest = request.body;
    if (!searchRequest) {
        reply.send({ received: false });
        return;
    }
    // let senderUuid = searchRequest.senderUuid
    // if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
    //     reply.send({ received: false })
    //     return
    // }
    let searchTerm = searchRequest.searchTerm;
    if (typeof searchTerm !== 'string' || searchTerm.length < 5 || searchTerm.length > 120) {
        reply.send({ received: false });
        return;
    }
    // TODO: implement
}
exports.processSearchRequest = processSearchRequest;
function processUserRequest(request, reply, encryptionKey) {
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
    // TODO: implement
}
exports.processUserRequest = processUserRequest;
exports.server.start(9000);
//# sourceMappingURL=server.js.map