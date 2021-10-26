import {
    container,
} from '@airport/di';
import {
	injectTransactionalConnector,
	injectTransactionalServer
} from '@airport/terminal'
import {
	injectAirportDatabase,
	injectEntityStateManager,
    LOCAL_API_SERVER
} from '@airport/tower'
import { WriteRequest } from '@airport/nonhub-types';
import {
    encryptString,
    decryptString
} from 'string-cipher';
import { CrdbScyllaVespaServer } from './CrdbScyllaVespaServer';

injectTransactionalConnector()
injectAirportDatabase()
injectTransactionalServer()
injectEntityStateManager()

const server = new CrdbScyllaVespaServer({
    logger: false,
})

var masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'

server.fastify.put('/', (
    request,
    reply
) => {
    handleRequest(request, reply).then()
})

async function handleRequest(
    request,
    reply
) {

    let requestData: WriteRequest
    let received = true
    try {
        const decryptedMessage = await decryptString(request.body, masterKey)
        requestData = JSON.parse(decryptedMessage)
    } catch (e) {
        received = false
    }
    if (!requestData || !received) {
        reply.send({ received: false })
        return
    }
    const localApiServer = await container(this).get(LOCAL_API_SERVER)
    let response = await localApiServer.handleRequest(request) as any

    response = {
        ...response,
        received: true
    }
    const ecryptedMessage = await encryptString(
        JSON.stringify(response), masterKey)
    reply.send(ecryptedMessage)
}

server.start()