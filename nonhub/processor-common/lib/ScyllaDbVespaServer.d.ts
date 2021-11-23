import pg from 'pg';
import { ScyllaDbServer } from '.';
export declare class ScyllaDbVespaServer extends ScyllaDbServer {
    pool: pg.Pool;
    protected doStartResources(): Promise<void>;
    protected initFramework(): Promise<void>;
    protected initVespa(): void;
    protected shutdownAdditionalResources(): Promise<void>;
    protected shutdownVespa(): Promise<void>;
    protected shutdownCockroachDb(): Promise<void>;
}
//# sourceMappingURL=ScyllaDbVespaServer.d.ts.map