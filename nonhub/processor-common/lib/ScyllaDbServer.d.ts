/// <reference types="node" />
import * as http from 'http';
import { BasicServer } from '.';
export declare class ScyllaDbServer extends BasicServer<http.Server> {
    scyllaDbClient: any;
    protected doStartResources(): Promise<void>;
    protected shutdownResources(): void;
    protected shutdownAdditionalResources(): Promise<void>;
}
//# sourceMappingURL=ScyllaDbServer.d.ts.map