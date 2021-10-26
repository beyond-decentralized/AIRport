import { ServerError, ServerState } from "@airport/nonhub-types";
import { decryptString } from 'string-cipher';
/*
 * Gotta have a syncing mechanism for AIRport.  Transaction Log store in ScyllaDb
 * is a good match.  Also gotta work on Votecube.  So a good match is
 * to integrate Votecube into AIRport now, with writes going to server-side
 * AIRport, which will write Transaction Logs to ScyllaDb.
 *
 * Votecube will be used for family questions, such as options in a
 * particular child raising situation.  Additional uses are possible
 * but won't be pushed.  In that sense "decide together" is primarily
 * for parents and children of a given familty to decide together
 * what to do.  Forum is more of a support system for parents (among
 * each other) and tasks (Hans style gravity balls) is AIRport only
 * mechanism for tracking tasks (each being represented by a Vote cube).
 *
 * So, brand is all about family, which is one thing that we all
 * have in common on this planet.
 */
export async function processRequest(request, reply, currentRequestMap, currentResultToResponseMap, serverState, 
// currentRepositoryToBatchMap: RepositoryToBatchMap,
masterKey) {
    let requestData;
    let received = true;
    try {
        const decryptedMessage = await decryptString(request.body, masterKey);
        requestData = JSON.parse(decryptedMessage);
    }
    catch (e) {
        received = false;
    }
    if (!requestData || !received) {
        reply.send({ received: false });
        return;
    }
    if (serverState !== ServerState.RUNNING) {
        reply.send({
            batchUuid: requestData.batchUuid,
            error: ServerError.SHUTDOWN,
            received: true
        });
        return;
    }
    // No need for validation - requests are prevalidated at gateway
    // Since decryption worked the message came from a valid gateway
    let repositoryIdSet = new Set();
    for (const record of requestData.records) {
        for (const read of record.reads) {
            const earliestSinceTime = currentRequestMap.get(read.repositoryId);
            repositoryIdSet.add(read.repositoryId);
            if (earliestSinceTime === undefined) {
                currentRequestMap.set(read.repositoryId, read.sinceTime);
            }
            else if (earliestSinceTime === null) {
                // Nothing to do
            }
            else {
                if (read.sinceTime < earliestSinceTime) {
                    currentRequestMap.set(read.repositoryId, read.sinceTime);
                }
            }
            // let batchSet = currentRepositoryToBatchMap.get(read.repositoryId)
            // if (!batchSet) {
            //     batchSet = new Set()
            //     currentRepositoryToBatchMap.set(read.repositoryId, batchSet)
            // }
            // batchSet.add(requestData.batchUuid)
        }
    }
    currentResultToResponseMap.set(requestData.batchUuid, {
        reply,
        repositoryIdSet
    });
}
//# sourceMappingURL=requestProcessor.js.map