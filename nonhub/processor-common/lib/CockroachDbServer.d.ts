/// <reference types="node" />
import * as http from 'http';
import pg from 'pg';
import { BasicServer } from '.';
export declare class CockroachDbServer extends BasicServer<http.Server> {
    pool: pg.Pool;
    protected doStartResources(): Promise<void>;
    protected shutdownResources(): Promise<void>;
}
//# sourceMappingURL=CockroachDbServer.d.ts.map