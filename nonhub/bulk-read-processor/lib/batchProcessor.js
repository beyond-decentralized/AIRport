import { ServerError } from "@airport/nonhub-types";
import { encryptStringSync } from "string-cipher";
import { server } from "./setup";
export async function processBatchRequests(requestMap, resultToResponseMap, 
// currentRepositoryToBatchMap: RepositoryToBatchMap,
masterKey) {
    const whereClauseFragments = [];
    for (const [repositoryId, sinceTime] of requestMap) {
        if (sinceTime) {
            let whereClauseFragment = `(tl.repository_id = '${repositoryId}'`;
            if (sinceTime) {
                whereClauseFragment += ` AND tl.timestamp >= ${sinceTime}`;
            }
            whereClauseFragment += ')';
            whereClauseFragments.push(whereClauseFragment);
        }
    }
    const query = `
    SELECT repository_id, data FROM votecube.transaction_logs tl
    WHERE
${whereClauseFragments.join('\nOR ')}
    `;
    server.scyllaDbClient.execute(query, function (error, results) {
        if (error) {
            console.log(error);
            for (const [batchUuid, replyInfo] of resultToResponseMap) {
                const batchResponse = {
                    batchUuid,
                    received: true,
                    error: ServerError.DATABASE,
                };
                replyInfo.reply.send(batchResponse);
            }
            return;
        }
        let resultMapByRepositoryId = new Map();
        for (let transactionLogEntry of results) {
            let transactionLogData = resultMapByRepositoryId.get(transactionLogEntry.repository_id);
            if (!transactionLogData) {
                transactionLogData = [];
                resultMapByRepositoryId.set(transactionLogEntry.repository_id, transactionLogData);
            }
            transactionLogData.push(transactionLogEntry.data);
        }
        let transactionLogsByRepositoryId = new Map();
        for (const [repositoryId, data] of resultMapByRepositoryId) {
            transactionLogsByRepositoryId.set(repositoryId, data.join(''));
        }
        for (const [batchUuid, replyInfo] of resultToResponseMap) {
            const results = {};
            for (const repositoryId of replyInfo.repositoryIdSet) {
                let repositoryTransactionLogs = transactionLogsByRepositoryId.get(repositoryId);
                if (repositoryTransactionLogs) {
                    results[repositoryId] = repositoryTransactionLogs;
                }
            }
            const batchResponse = {
                batchUuid,
                received: true,
                results,
            };
            const ecryptedMessage = encryptStringSync(JSON.stringify(batchResponse), masterKey);
            replyInfo.reply.send(ecryptedMessage);
        }
    });
}
//# sourceMappingURL=batchProcessor.js.map