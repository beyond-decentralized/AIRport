import * as http from 'http'
import Fastify from 'fastify'
import type {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyServerOptions,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
} from 'fastify'
import { ServerState } from '@airport/nonhub-types/src/types/common'

export class BasicServer<
    Server extends http.Server,
    Request extends RawRequestDefaultExpression<Server> = RawRequestDefaultExpression<Server>,
    Reply extends RawReplyDefaultExpression<Server> = RawReplyDefaultExpression<Server>,
    Logger extends FastifyLoggerInstance = FastifyLoggerInstance
    > {

    fastify: FastifyInstance<Server, Request, Reply, Logger> & PromiseLike<FastifyInstance<Server, Request, Reply, Logger>>
    serverState: ServerState = ServerState.RUNNING
    private shutdownIntervalHandle
    private batchIntervalHandle

    constructor(
        opts?: FastifyServerOptions<Server, Logger>
    ) {
        this.fastify = Fastify(opts)

        process.on('SIGINT', () => {
            console.log('SIGINT signal received, shutting down.')
            this.shutdown()
        })

        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received, shutting down.');
            this.shutdown()
        })

        process.on('uncaughtException', function (error) {
            console.log('received uncaught exception, shutting down.', error)
            this.shutdown()
        })
    }

    start(
        port = 80,
        address = '0.0.0.0'
    ) {
        this.doStart(port, address).then()
    }

    shutdown() {
        this.serverState = ServerState.SHUTTING_DOWN_REQUESTS
        this.shutdownIntervalHandle = setInterval(() => {
            if (this.serverState === ServerState.SHUTTING_DOWN_SERVER) {
                clearInterval(this.shutdownIntervalHandle)
                this.shutdownServer()
            }
        }, 5000)
    }

    setIntervalProcessing(
        callback: () => Promise<void>,
        interval: number
    ) {
        this.batchIntervalHandle = setInterval(() => {
            callback().then()
        }, interval)
        this.checkServerState()
    }

    protected async doStart(
        port: number,
        address: string
    ) {
        try {
            await this.doStartResources()
            await this.fastify.listen(port, address)
        } catch (err) {
            try {
                this.fastify.log.error(err)
            } finally {
                process.exit(1)
            }
        }
    }

    protected async doStartResources() {
        // Overwrite if there are resources that must be started
    }

    protected shutdownServer() {
        this.fastify.close().then(() => {
            console.log('httpserver shutdown successfully')
            this.shutdownResources()
        }, (err) => {
            console.log('error shutting down httpserver', err)
            this.shutdownResources()
        })
    }

    protected shutdownResources() {
        process.exit(0)
    }

    protected checkServerState() {
        if (this.serverState === ServerState.SHUTTING_DOWN_REQUESTS
            || this.serverState === ServerState.SHUTTING_DOWN_SERVER) {
            if (this.batchIntervalHandle) {
                clearInterval(this.batchIntervalHandle)
                this.batchIntervalHandle = null
                this.serverState = ServerState.SHUTTING_DOWN_SERVER
            }
        }
    }

}