/// <reference types="node" />
import { BasicServer } from "@airport/nonhub-types";
import * as http from 'http';
export declare class ScyllaDbServer extends BasicServer<http.Server> {
    scyllaDbClient: any;
    protected doStartResources(): Promise<void>;
    protected shutdownResources(): void;
    protected shutdownAdditionalResources(): Promise<void>;
}
//# sourceMappingURL=ScyllaDbServer.d.ts.map