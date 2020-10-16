import { JsonSchema } from '@airport/ground-control';
export interface IDatabaseManager {
    isInitialized(): boolean;
    init(domainName: string, ...schemas: JsonSchema[]): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airDb;
    isInitialized(): boolean;
    init(domainName: string, ...schemas: JsonSchema[]): Promise<void>;
    private initFeatureSchemas;
    private initTerminal;
    private installAirportSchema;
}
//# sourceMappingURL=DatabaseManager.d.ts.map