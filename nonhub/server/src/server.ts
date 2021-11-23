
import {
    decryptString,
    encryptStringSync
} from "string-cipher";
import { ScyllaDbVespaServer } from "@airport/processor-common";
import {
    IReadRequest,
    IWriteRequest,
    SearchRequest,
    ServerState,
    UserRequest,
} from '@airport/nonhub-types'

var masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'

const EARLIEST_BIRTH_MONTH = Date.UTC(1900, 0)

export const server = new ScyllaDbVespaServer({
    logger: false,
})

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


server.fastify.put('/read', (
    request,
    reply
) => {
    serveReadRequest(
        request, reply,
        server.serverState,
        masterKey)
})

server.fastify.put('/write', (
    request,
    reply
) => {
    serveWriteRequest(
        request, reply,
        server.serverState,
        masterKey)
})

server.fastify.put('/search', (
    request,
    reply
) => {
    // TODO: implement
})

async function serveReadRequest(
    request,
    reply,
    serverState: ServerState,
    masterKey: string
) {
    if (serverState !== ServerState.RUNNING) {
        reply.send('')
        return
    }
    const readRequest = await processRequest<IReadRequest>(request.body)
    if (!readRequest) {
        reply.send('')
        return
    }
    let query = `
    SELECT data FROM votecube.transaction_logs tl
    WHERE
        repository_uuid = ?`;
    let params: any[] = [readRequest.repositoryUuId];

    if (readRequest.transactionLogEntryTime) {
        query = `${query}
        AND transaction_log_entry_time >= ?`
        params = [readRequest.repositoryUuId, readRequest.transactionLogEntryTime];
    }

    server.scyllaDbClient.execute(query, function (
        error,
        results: string
    ) {
        if (error) {
            console.log(error)
            reply.send('')
            return
        }
        const ecryptedMessage = encryptStringSync(
            results, masterKey)
        reply.send(ecryptedMessage)
    });
}

async function processRequest<Req>(
    request,
): Promise<Req> {
    try {
        const decryptedMessage = await decryptString(request.body, masterKey)
        return JSON.parse(decryptedMessage)
    } catch (e) {
        console.log(e)
        return null
    }
}

async function serveWriteRequest(
    request,
    reply,
    serverState: ServerState,
    masterKey: string
) {
    if (serverState !== ServerState.RUNNING) {
        reply.send('')
        return
    }
    const writeRequest = await processRequest<IWriteRequest>(request.body)
    if (!writeRequest) {
        reply.send('')
        return
    }

    let transactionLogEntryTime = new Date().getTime()

    let query = `
    INSERT INTO votecube.transaction_logs (repository_uuid, transaction_log_entry_time, data)
    VALUES (?, ?, ?)`;

    const params = [writeRequest.repositoryUuId, transactionLogEntryTime, writeRequest.data];
    server.scyllaDbClient.execute(query, params, function (
        error,
        _results
    ) {
        if (error) {
            console.log(error)
            reply.send('')
            return
        }
        const ecryptedMessage = encryptStringSync(
            JSON.stringify({
                transactionLogEntryTime
            }), masterKey)
        reply.send(ecryptedMessage)
    });
}

export function processSearchRequest(
    request,
    reply,
) {
    let searchRequest: SearchRequest = request.body as SearchRequest
    if (!searchRequest) {
        reply.send({ received: false })
        return
    }
    let senderUuid = searchRequest.senderUuid
    if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
        reply.send({ received: false })
        return
    }
    let searchTerm = searchRequest.searchTerm
    if (typeof searchTerm !== 'string' || searchTerm.length < 5 || searchTerm.length > 120) {
        reply.send({ received: false })
        return
    }

    // TODO: implement
}

export function processUserRequest(
    request,
    reply,
    masterKey
) {
    const userRequest: UserRequest = request.body
    const email = userRequest.email
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (typeof email !== 'string'
        || email.length > 64
        || !emailRegexp.test(email)) {
        reply.send({
            received: true,
            error: 'INVALID_EMAIL'
        })
        return
    }
    const username = userRequest.userName
    const usernameRegexp = /^\S*$/
    if (typeof username !== 'string'
        || username.length < 3 || username.length > 32
        || !usernameRegexp.test(username)) {
        reply.send({
            received: true,
            error: 'INVALID_USERNAME'
        })
        return
    }

    const now = new Date().getTime()

    const birthMonth = parseInt(userRequest.birthMonth as any)
    if (isNaN(birthMonth) || typeof birthMonth !== 'number'
        || birthMonth < EARLIEST_BIRTH_MONTH || birthMonth > now) {
        reply.send({
            received: true,
            error: 'INVALID_BIRTH_MONTH'
        })
        return
    }

    const countryId = parseInt(userRequest.countryId as any)
    if (isNaN(countryId) || typeof countryId !== 'number'
        || countryId < 1 || countryId > 234) {
        reply.send({
            received: true,
            error: 'INVALID_COUNTRY'
        })
        return
    }

    // TODO: implement
}

server.start()