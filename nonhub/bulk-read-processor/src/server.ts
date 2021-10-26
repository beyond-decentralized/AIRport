import Fastify from 'fastify'
import { processBatchRequests } from './batchProcessor'
import { processRequest } from './requestProcessor'
import {
    RequestMap,
    ResultToResponseMap,
} from './types'
import { server } from './setup'

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

let currentRequestMap: RequestMap = new Map()
let currentResultToResponseMap: ResultToResponseMap = new Map()
// let currentRepositoryToBatchMap: RepositoryToBatchMap = new Map()

server.setIntervalProcessing(async () => {
    let lastRequestMap = currentRequestMap
    let lastResultToResponseMap = currentResultToResponseMap
    // let lastRepositoryToBatchMap = currentRepositoryToBatchMap

    currentRequestMap = new Map()
    currentResultToResponseMap = new Map()

    await processBatchRequests(lastRequestMap, lastResultToResponseMap,
        // lastRepositoryToBatchMap, 
        masterKey)
}, 600)

server.fastify.put('/', (
    request,
    reply
) => {
    processRequest(
        request, reply,
        currentRequestMap, currentResultToResponseMap,
        // currentRepositoryToBatchMap,
        server.serverState,
        masterKey)
})

server.start()