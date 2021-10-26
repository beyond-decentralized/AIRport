/// <reference types="node" />
import * as http from 'http';
import type { FastifyInstance, FastifyLoggerInstance, FastifyServerOptions, RawReplyDefaultExpression, RawRequestDefaultExpression } from 'fastify';
import { ServerState } from '../types/common';
export declare class BasicServer<Server extends http.Server, Request extends RawRequestDefaultExpression<Server> = RawRequestDefaultExpression<Server>, Reply extends RawReplyDefaultExpression<Server> = RawReplyDefaultExpression<Server>, Logger extends FastifyLoggerInstance = FastifyLoggerInstance> {
    fastify: FastifyInstance<Server, Request, Reply, Logger> & PromiseLike<FastifyInstance<Server, Request, Reply, Logger>>;
    serverState: ServerState;
    private shutdownIntervalHandle;
    private batchIntervalHandle;
    constructor(opts?: FastifyServerOptions<Server, Logger>);
    start(): void;
    shutdown(): void;
    setIntervalProcessing(callback: () => Promise<void>, interval: number): void;
    protected doStart(): Promise<void>;
    protected doStartResources(): Promise<void>;
    protected shutdownServer(): void;
    protected shutdownResources(): void;
    protected checkServerState(): void;
}
//# sourceMappingURL=BasicServer.d.ts.map