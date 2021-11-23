/// <reference types="node" />
import * as http from 'http';
import { BasicServer } from '@airport/nonhub-types';
import pg from 'pg';
export declare class CockroachDbServer extends BasicServer<http.Server> {
    pool: pg.Pool;
    protected doStartResources(): Promise<void>;
    protected shutdownResources(): Promise<void>;
}
//# sourceMappingURL=CockroachDbServer.d.ts.map