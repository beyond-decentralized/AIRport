import { decryptString, encryptStringSync } from "string-cipher";
import { ScyllaDbVespaServer } from "@airport/processor-common";
import { ServerState, } from '@airport/nonhub-types';
var masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ';
export const server = new ScyllaDbVespaServer({
    logger: false,
});
/*
server.fastify.register(require('fastify-cors'), {
    origin: (
        origin,
        cb
    ) => {
        if (!origin || /my.favorite.host/.test(origin) || /localhost/.test(origin)) {
            // Request from configured host or localhost (for testing) will pass
            cb(null, true)
            return
        }
        cb(new Error('Not allowed CORS host'), false)
    }
})
 */
server.fastify.put('/read', (request, reply) => {
    serveReadRequest(request, reply, server.serverState, masterKey);
});
async function serveReadRequest(request, reply, serverState, masterKey) {
    if (serverState !== ServerState.RUNNING) {
        reply.send('');
        return;
    }
    const readRequest = await processRequest(request.body);
    if (!readRequest) {
        reply.send('');
        return;
    }
    let query = `
    SELECT data FROM votecube.transaction_logs tl
    WHERE
        repository_uuid = ?`;
    let params = [readRequest.repositoryUuId];
    if (readRequest.transactionLogEntryTime) {
        query = `${query}
        AND transaction_log_entry_time >= ?`;
        params = [readRequest.repositoryUuId, readRequest.transactionLogEntryTime];
    }
    server.scyllaDbClient.execute(query, function (error, results) {
        if (error) {
            console.log(error);
            reply.send('');
            return;
        }
        const ecryptedMessage = encryptStringSync(results, masterKey);
        reply.send(ecryptedMessage);
    });
}
async function processRequest(request) {
    try {
        const decryptedMessage = await decryptString(request.body, masterKey);
        return JSON.parse(decryptedMessage);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
server.fastify.put('/write', (request, reply) => {
    serveWriteRequest(request, reply, server.serverState, masterKey);
});
async function serveWriteRequest(request, reply, serverState, masterKey) {
    if (serverState !== ServerState.RUNNING) {
        reply.send('');
        return;
    }
    const writeRequest = await processRequest(request.body);
    if (!writeRequest) {
        reply.send('');
        return;
    }
    let transactionLogEntryTime = new Date().getTime();
    let query = `
    INSERT INTO votecube.transaction_logs (repository_uuid, transaction_log_entry_time, data)
    VALUES (?, ?, ?)`;
    const params = [writeRequest.repositoryUuId, transactionLogEntryTime, writeRequest.data];
    server.scyllaDbClient.execute(query, params, function (error, _results) {
        if (error) {
            console.log(error);
            reply.send('');
            return;
        }
        const ecryptedMessage = encryptStringSync(JSON.stringify({
            transactionLogEntryTime
        }), masterKey);
        reply.send(ecryptedMessage);
    });
}
server.fastify.put('/search', (request, reply) => {
    // TODO: implement
});
server.start();
//# sourceMappingURL=server.js.map