"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicServer = void 0;
const fastify_1 = require("fastify");
const server_types_1 = require("./server-types");
class BasicServer {
    constructor(opts) {
        this.serverState = server_types_1.ServerState.RUNNING;
        this.fastify = (0, fastify_1.default)(opts);
        const _this = this;
        process.on('SIGINT', () => {
            console.log('SIGINT signal received, shutting down.');
            _this.shutdown();
        });
        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received, shutting down.');
            _this.shutdown();
        });
        process.on('uncaughtException', function (error) {
            console.log('received uncaught exception, shutting down.', error);
            _this.shutdown();
        });
    }
    start(port = 80, address = '0.0.0.0') {
        this.doStart(port, address).then();
    }
    shutdown() {
        this.serverState = server_types_1.ServerState.SHUTTING_DOWN_REQUESTS;
        const shutdownIntervalHandle = setInterval(() => {
            console.log('Checking shutdown');
            if (this.serverState === server_types_1.ServerState.SHUTTING_DOWN_SERVER) {
                console.log('Removing shutdown check');
                clearInterval(shutdownIntervalHandle);
                console.log('Shutting down');
                this.shutdownServer();
            }
            else {
                console.log('NOT shutting down');
            }
            this.checkServerState();
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
        console.log('Shutting Down Fastify');
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
        if (this.serverState === server_types_1.ServerState.SHUTTING_DOWN_REQUESTS
            || this.serverState === server_types_1.ServerState.SHUTTING_DOWN_SERVER) {
            if (this.batchIntervalHandle) {
                clearInterval(this.batchIntervalHandle);
                this.batchIntervalHandle = null;
            }
            this.serverState = server_types_1.ServerState.SHUTTING_DOWN_SERVER;
        }
    }
}
exports.BasicServer = BasicServer;
//# sourceMappingURL=BasicServer.js.map