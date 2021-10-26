import {
    BasicServer,
    ReadReplyContext,
    ReadReplyToClient,
    ReadRequest,
    ReadRequestBatch,
    ReplyToClient,
    ReplyToClientContext,
    RequestBatch,
} from '@airport/nonhub-types'
import Fastify from 'fastify'
import { v4 as uuidv4 } from "uuid"
import {
    processBatchRequests,
    respondToReads
} from './batchProcessors'
import {
    processReadRequest,
    processWriteRequest,
} from './requestProcessors'

const fs = require('fs')
const path = require('path')

const server = new BasicServer({
    logger: false,
    // http2: true,
    // https: {
    //     key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    //     cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert'))
    // }
})

var masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'
/* 
fastify.register(require('fastify-cors'), {
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

server.fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
})

function getNewBatch<
    RequestRecordType,
    Reply extends ReplyToClient,
    ReplyContext extends ReplyToClientContext<Reply>
>(): RequestBatch<RequestRecordType, Reply, ReplyContext> {
    return {
        requestData: {
            records: [],
            batchUuid: uuidv4()
        },
        replyContexts: {}
    }
}

let currentRead = getNewBatch<
    ReadRequest, ReadReplyToClient, ReadReplyContext
>() as ReadRequestBatch

// There really is no need to batch search requests
// No real benefit is attained from it in terms of
// performance, beyond doing fewer ecryptions/decriptions
// and having fewer bytes sent to back-end as protocol
// headers
// let currentSearch = getNewBatch<
//     SearchRequest, SearchReplyToClient, SearchReplyContext
// >() as SearchRequestBatch

// Batching user requests can gain some performance
// benefits but the number of user requests is expected to
// be far below the number of read requests - either
// way no need to spend time doing this now
// let currentUser = getNewBatch<
//     UserRequest, UserReplyToClient, UserReplyContext
// >() as UserRequestBatch

// TODO: implement AIRport-in-Cloud solution that has access
// to sequences and batches requests based on entity of insert
// (in valid order), while quicky returing new Ids to the client
// NOTE: insert operations ONLY are supported for the time being
// which is sufficient for Votecube.  Also no reads
// can be done as part of validation - ids of existing records
// will be checked eventually - should be valid for good requests
// and will simply be denied for invalid requests (though requiring
// first querying for them in bulk to validate)
// Either way - too much work for now, will get back to it once
// Votecube server load from writes gets to be too heavy (or
// approaches that level).
// let currentWrite = getNewBatch<
//     WriteRequest, WriteReplyToClient, WriteReplyContext
// >() as WriteRequestBatch

// setInterval(async () => {
//     processBatchRequests(() => {
//         const value = currentSearch
//         currentSearch = getNewBatch()
//         return value
//     }, () => currentSearch, masterKey, 'http://localhost:2345', genericRespond)
// }, 200)
server.setIntervalProcessing(async () => {
    await processBatchRequests(() => {
        const value = currentRead
        currentRead = getNewBatch()
        return value
    }, () => currentRead, masterKey, 'http://localhost:3456', respondToReads)
}, 600)
// setTimeout(() => {
//     setInterval(async () => {
//         processBatchRequests(() => {
//             const value = currentWrite
//             currentWrite = getNewBatch()
//             return value
//         }, () => currentWrite, masterKey, 'http://localhost:4567', genericRespond)
//     }, 600)
// }, 200)
// setTimeout(() => {
//     setInterval(async () => {
//         processBatchRequests(() => {
//             const value = currentUser
//             currentUser = getNewBatch()
//             return value
//         }, () => currentUser, masterKey, 'http://localhost:5678', genericRespond)
//     }, 600)
// }, 400)


server.fastify.put('/read', (
    request,
    reply
) => {
    processReadRequest(request, reply, currentRead)
})

server.fastify.put('/search', (
    request,
    reply
) => {
    // processSearchRequest(request, reply, currentSearch)
})

server.fastify.put('/user', (
    request,
    reply
) => {
    // processUserRequest(request, reply, currentUser)
})

server.fastify.put('/write', (
    request,
    reply
) => {
    processWriteRequest(request, reply, masterKey, 'http://localhost:2345')
})

server.start()