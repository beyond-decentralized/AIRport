import { TerminalMessage } from "@airport/arrivals-n-departures";
import { IDomain, ISchema } from "@airport/airspace";
export interface IDomainCheckRecord {
    domain?: IDomain;
    domainName: string;
    found?: boolean;
}
export interface ISchemaCheckRecord {
    found?: boolean;
    schemaName: string;
    schema?: ISchema;
}
export interface ISyncInSchemaChecker {
    ensureSchemas(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInSchemaChecker implements ISyncInSchemaChecker {
    ensureSchemas(message: TerminalMessage): Promise<boolean>;
    private checkSchemasAndDomains;
    private getNames;
}
//# sourceMappingURL=SyncInSchemaChecker.d.ts.map