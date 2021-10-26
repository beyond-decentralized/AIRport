import {
    BatchReadResponse,
    RepositoryId,
    ServerError,
    TransactionLogs
} from "@airport/nonhub-types";
import { encryptStringSync } from "string-cipher";
import { server } from "./setup";
import {
    Data,
    RequestMap,
    ResultToResponseMap,
    TransactionLog,
} from "./types";

export async function processBatchRequests(
    requestMap: RequestMap,
    resultToResponseMap: ResultToResponseMap,
    // currentRepositoryToBatchMap: RepositoryToBatchMap,
    masterKey: string
) {
    const whereClauseFragments: string[] = []
    for (const [repositoryId, sinceTime] of requestMap) {
        if (sinceTime) {
            let whereClauseFragment = `(tl.repository_id = '${repositoryId}'`
            if (sinceTime) {
                whereClauseFragment += ` AND tl.timestamp >= ${sinceTime}`
            }
            whereClauseFragment += ')'
            whereClauseFragments.push(whereClauseFragment)
        }
    }
    const query = `
    SELECT repository_id, data FROM votecube.transaction_logs tl
    WHERE
${whereClauseFragments.join('\nOR ')}
    `;
    server.scyllaDbClient.execute(query, function (
        error,
        results: TransactionLog[]
    ) {
        if (error) {
            console.log(error)
            for (const [batchUuid, replyInfo] of resultToResponseMap) {
                const batchResponse: BatchReadResponse = {
                    batchUuid,
                    received: true,
                    error: ServerError.DATABASE,
                }
                replyInfo.reply.send(batchResponse)
            }
            return
        }
        let resultMapByRepositoryId: Map<RepositoryId, Data[]> = new Map()
        for (let transactionLogEntry of results) {
            let transactionLogData = resultMapByRepositoryId.get(transactionLogEntry.repository_id)
            if (!transactionLogData) {
                transactionLogData = []
                resultMapByRepositoryId.set(transactionLogEntry.repository_id, transactionLogData)
            }
            transactionLogData.push(transactionLogEntry.data)
        }
        let transactionLogsByRepositoryId: Map<RepositoryId, TransactionLogs> = new Map()
        for (const [repositoryId, data] of resultMapByRepositoryId) {
            transactionLogsByRepositoryId.set(repositoryId, data.join(''))
        }
        for (const [batchUuid, replyInfo] of resultToResponseMap) {
            const results: {
                [repositoryId: string]: TransactionLogs
            } = {
            }
            for (const repositoryId of replyInfo.repositoryIdSet) {
                let repositoryTransactionLogs = transactionLogsByRepositoryId.get(repositoryId)
                if (repositoryTransactionLogs) {
                    results[repositoryId] = repositoryTransactionLogs
                }
            }
            const batchResponse: BatchReadResponse = {
                batchUuid,
                received: true,
                results,
            }

            const ecryptedMessage = encryptStringSync(
                JSON.stringify(batchResponse), masterKey)
            replyInfo.reply.send(ecryptedMessage)
        }
    });
}