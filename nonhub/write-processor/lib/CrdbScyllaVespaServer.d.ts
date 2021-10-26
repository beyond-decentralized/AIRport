import { ScyllaDbServer } from '@airport/processor-common';
import pg from 'pg';
export declare class CrdbScyllaVespaServer extends ScyllaDbServer {
    pool: pg.Pool;
    protected doStartResources(): Promise<void>;
    protected initFramework(): Promise<void>;
    protected initCockroachDb(): Promise<void>;
    protected initVespa(): void;
    protected shutdownAdditionalResources(): Promise<void>;
    protected shutdownVespa(): Promise<void>;
    protected shutdownCockroachDb(): Promise<void>;
}
//# sourceMappingURL=CrdbScyllaVespaServer.d.ts.map