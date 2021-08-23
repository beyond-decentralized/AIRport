import { IContext } from '@airport/di';
import { JsonSchema } from '@airport/ground-control';
import { IDatabaseManager } from '@airport/terminal-map';
export declare class DatabaseManager implements IDatabaseManager {
    private initialized;
    initNoDb(context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    isInitialized(): boolean;
    private initFeatureSchemas;
    private initTerminal;
    private installAirportSchema;
}
//# sourceMappingURL=DatabaseManager.d.ts.map