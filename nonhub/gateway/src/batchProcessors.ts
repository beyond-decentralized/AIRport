import {
    encryptString,
    decryptString
} from 'string-cipher'
import {
    BatchReadResponse,
    BatchResponse,
    BatchWriteResponse,
    ReadReplyContext,
    ReadRequestBatch,
    ReplyToClient,
    ReplyToClientContext,
    RepositoryId,
    RequestBatch,
    ServerError,
    TransactionLogs,
    WriteRequestBatch
} from '@airport/nonhub-types'

const axios = require('axios')

export async function processBatchRequests<
    RecordType,
    Reply extends ReplyToClient,
    ReplyContext extends ReplyToClientContext<Reply>,
    BatchResponseType,
    BatchIn extends RequestBatch<RecordType, Reply, ReplyContext>,
    BatchOut extends BatchResponse<BatchResponseType>>(
        getBatch: () => BatchIn,
        getCurrentBatch: () => BatchIn,
        masterKey: string,
        requestHost: string,
        respond: (
            lastBatch: BatchIn,
            responseData: BatchOut
        ) => void
    ): Promise<void> {
    const lastBatch = getBatch()
    if (!lastBatch.requestData.records.length) {
        return
    }
    // const currentBatch = getCurrentBatch()

    let received = true
    let response: string
    try {
        const ecryptedMessage = await encryptString(
            JSON.stringify(lastBatch.requestData), masterKey)
        response = await axios.put(requestHost, ecryptedMessage)
    } catch (e) {
        received = false
    }
    if (!received) {
        for (let uuid in lastBatch.replyContexts) {
            lastBatch.replyContexts[uuid].replyHandle.send({
                received: false
            } as any)
        }
        return
    }

    let responseData: BatchOut
    try {
        const decryptedMessage = await decryptString(response, masterKey)
        responseData = JSON.parse(decryptedMessage)
    } catch (e) {
        received = false
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
                    } as any)
                }
                break
        }
        return
    }

    respond(lastBatch, responseData)
}

export function respondToReads(
    requestBatch: ReadRequestBatch,
    response: BatchReadResponse
) {
    // Group reply contexts by repository id (duplicates possible)
    const replyContextsByRepositoryId: Map<
        RepositoryId, Set<ReadReplyContext>
    > = new Map()
    for (const record of requestBatch.requestData.records) {
        const replyContext = requestBatch.replyContexts[record.uuid]
        for (const read of record.reads) {
            let replyContextsForRepositoryId = replyContextsByRepositoryId.get(read.repositoryId)
            if (!replyContextsForRepositoryId) {
                replyContextsForRepositoryId = new Set()
                replyContextsByRepositoryId.set(read.repositoryId, replyContextsForRepositoryId)
            }
            replyContextsForRepositoryId.add(replyContext)
        }
    }
    // Add transactionLogs records to each reply context
    for (let repositoryId in response.results) {
        const transactionLogs: TransactionLogs = response.results[repositoryId]
        const replyContextsForRepositoryId = replyContextsByRepositoryId.get(repositoryId)
        for (const replyContext of replyContextsForRepositoryId) {
            replyContext.records.push(transactionLogs)
        }
    }
    // Send data back
    for (let uuid in requestBatch.replyContexts) {
        let replyContext = requestBatch.replyContexts[uuid]
        replyContext.replyHandle.send({
            received: true,
            records: replyContext.records,
        })
        replyContext.responded = true
    }
    // Handle any requests that haven't been responded to
    for (let uuid in requestBatch.replyContexts) {
        let replyContext = requestBatch.replyContexts[uuid]
        if (!replyContext.responded) {
            replyContext.replyHandle.send({
                received: false
            })
        }
    }
}

export function respondToWrites(
    requestBatch: WriteRequestBatch,
    response: BatchWriteResponse
) {

}

export function genericRespond<
    Request,
    Reply extends ReplyToClient,
    ReplyContext extends ReplyToClientContext<Reply>,
    BatchResponseType>(
        requestBatch: RequestBatch<Request, Reply, ReplyContext>,
        response: BatchResponse<BatchResponseType>
    ) {
    for (let uuid in response.results) {
        let replyToClientContext = requestBatch.replyContexts[uuid]
        if (replyToClientContext) {
            replyToClientContext.replyHandle.send({
                received: response.results[uuid]
            } as any)
            replyToClientContext.responded = true
        }
    }
    for (let uuid in requestBatch.replyContexts) {
        let clientConnection = requestBatch.replyContexts[uuid]
        if (!clientConnection.responded) {
            clientConnection.replyHandle.send({
                received: false
            } as any)
        }
    }
}