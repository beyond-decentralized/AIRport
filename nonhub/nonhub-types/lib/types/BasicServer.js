import Fastify from 'fastify';
import { ServerState } from '../types/common';
export class BasicServer {
    constructor(opts) {
        this.serverState = ServerState.RUNNING;
        this.fastify = Fastify(opts);
        process.on('SIGINT', () => {
            console.log('SIGINT signal received, shutting down.');
            this.shutdown();
        });
        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received, shutting down.');
            this.shutdown();
        });
        process.on('uncaughtException', function (error) {
            console.log('received uncaught exception, shutting down.', error);
            this.shutdown();
        });
    }
    start(port = 80, address = '0.0.0.0') {
        this.doStart(port, address).then();
    }
    shutdown() {
        this.serverState = ServerState.SHUTTING_DOWN_REQUESTS;
        this.shutdownIntervalHandle = setInterval(() => {
            if (this.serverState === ServerState.SHUTTING_DOWN_SERVER) {
                clearInterval(this.shutdownIntervalHandle);
                this.shutdownServer();
            }
        }, 5000);
    }
    setIntervalProcessing(callback, interval) {
        this.batchIntervalHandle = setInterval(() => {
            callback().then();
        }, interval);
        this.checkServerState();
    }
    async doStart(port, address) {
        try {
            await this.doStartResources();
            await this.fastify.listen(port, address);
        }
        catch (err) {
            try {
                this.fastify.log.error(err);
            }
            finally {
                process.exit(1);
            }
        }
    }
    async doStartResources() {
        // Overwrite if there are resources that must be started
    }
    shutdownServer() {
        this.fastify.close().then(() => {
            console.log('httpserver shutdown successfully');
            this.shutdownResources();
        }, (err) => {
            console.log('error shutting down httpserver', err);
            this.shutdownResources();
        });
    }
    shutdownResources() {
        process.exit(0);
    }
    checkServerState() {
        if (this.serverState === ServerState.SHUTTING_DOWN_REQUESTS
            || this.serverState === ServerState.SHUTTING_DOWN_SERVER) {
            if (this.batchIntervalHandle) {
                clearInterval(this.batchIntervalHandle);
                this.batchIntervalHandle = null;
                this.serverState = ServerState.SHUTTING_DOWN_SERVER;
            }
        }
    }
}
//# sourceMappingURL=BasicServer.js.map