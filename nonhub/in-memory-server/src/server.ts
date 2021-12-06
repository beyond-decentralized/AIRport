import type {
    RepositorySynchronizationMessage,
    RepositorySynchronizationReadRequest,
    RepositorySynchronizationReadResponse,
    RepositorySynchronizationWriteRequest,
    RepositorySynchronizationWriteResponse
} from '@airport/arrivals-n-departures';
import type { Repository_UuId } from '@airport/holding-pattern';
import type {
    SearchRequest,
    UserRequest,
} from '@airport/nonhub-types'
import {
    BasicServer,
    ServerState
} from '@airport/processor-common'
import * as http from 'http'

// var encryptionKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'
var encryptionKey = process.env.ENCRYPTION_KEY as string

const EARLIEST_BIRTH_MONTH = Date.UTC(1900, 0)

export const server: BasicServer<http.Server> = new BasicServer<http.Server>({
    logger: false,
})

export interface ITransactionLogEntry {
    messages: RepositorySynchronizationMessage[]
    syncTimestamp: number
}

const transactionLogs: Map<Repository_UuId, ITransactionLogEntry[]>
    = new Map()

server.fastify.register(require('fastify-cors'), {
    origin: (
        origin: any,
        cb: any
    ) => {
        if (!origin || /localhost/.test(origin)) {
            // Request from configured host or localhost (for testing) will pass
            cb(null, true)
            return
        }
        cb(new Error('Not allowed CORS host'), false)
    }
})

server.fastify.put('/read', (
    request,
    reply
) => {
    serveReadRequest(
        request, reply,
        server.serverState,
        encryptionKey)
})

server.fastify.put('/write', (
    request,
    reply
) => {
    serveWriteRequest(
        request, reply,
        server.serverState,
        encryptionKey)
})

server.fastify.put('/search', (
    request,
    reply
) => {
    // TODO: implement
})

async function serveReadRequest(
    request: any,
    reply: any,
    serverState: ServerState,
    encryptionKey: string
) {
    if (serverState !== ServerState.RUNNING) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }))
        return
    }
    const readRequest = await processRequest<RepositorySynchronizationReadRequest>(
        request)
    if (!readRequest) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }))
        return
    }

    let transactionLog = transactionLogs.get(readRequest.repositoryUuId)

    if (!transactionLog || !transactionLog.length) {
        reply.send(packagedMessage)
        return []
    }

    let messages = transactionLog
    if (readRequest.syncTimestamp) {
        messages = []
        for (let transactionLogEntry of transactionLog) {
            if (transactionLogEntry.syncTimestamp >= readRequest.syncTimestamp) {
                messages.push(transactionLogEntry)
            }
        }
    }

    let packagedMessage = messages.join('|')
    // if (encryptionKey) {
    //     packagedMessage = encryptStringSync(results.join('|'), encryptionKey)
    // }
    reply.send({
        messages,
        repositoryUiId: readRequest.repositoryUuId,
        syncTimestamp
    })
}

async function processRequest<Req>(
    request: any,
): Promise<Req> {
    try {
        let unpackagedMessage = request.body
        // if (encryptionKey) {
        //     unpackagedMessage = await decryptString(request.body, encryptionKey)
        // }
        // console.log('Is object: ' + (typeof unpackagedMessage === 'object'))
        // return JSON.parse(unpackagedMessage)
        return unpackagedMessage
    } catch (e) {
        console.error(e)
        console.log('Request:')
        console.log(request.body)

        return null as any
    }
}

async function serveWriteRequest(
    request: any,
    reply: any,
    serverState: ServerState,
    encryptionKey: string
) {
    if (serverState !== ServerState.RUNNING) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }))
        return
    }
    const writeRequest = await processRequest<RepositorySynchronizationWriteRequest>(
        request)
    if (!writeRequest) {
        reply.send(JSON.stringify({
            error: 'Internal Error'
        }))
        return
    }

    const syncTimestamp = new Date().getTime()

    let transactionLog = transactionLogs.get(writeRequest.repositoryUuId)
    if (!transactionLog) {
        transactionLog = []
        transactionLogs.set(writeRequest.repositoryUuId, transactionLog)
    }

    transactionLog.push({
        messages: writeRequest.messages,
        syncTimestamp
    })

    // let packagedMessage = JSON.stringify({
    //     syncTimestamp
    // } as RepositorySynchronizationWriteResponse)
    // if (encryptionKey) {
    //     packagedMessage = encryptStringSync(
    //         packagedMessage, encryptionKey)
    // }
    reply.send({
        syncTimestamp
    })
}

export function processSearchRequest(
    request: any,
    reply: any,
) {
    let searchRequest: SearchRequest = request.body as SearchRequest
    if (!searchRequest) {
        reply.send({ received: false })
        return
    }
    // let senderUuid = searchRequest.senderUuid
    // if (typeof senderUuid !== 'string' || senderUuid.length !== 36) {
    //     reply.send({ received: false })
    //     return
    // }
    let searchTerm = searchRequest.searchTerm
    if (typeof searchTerm !== 'string' || searchTerm.length < 5 || searchTerm.length > 120) {
        reply.send({ received: false })
        return
    }

    // TODO: implement
}

export function processUserRequest(
    request: any,
    reply: any,
    encryptionKey?: string
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

server.start(9000)