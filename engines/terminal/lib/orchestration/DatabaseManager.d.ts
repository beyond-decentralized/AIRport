import { IContext } from '@airport/di';
import { IDatabaseManager } from '@airport/terminal-map';
import { JsonSchemaWithLastIds } from '@airport/security-check';
export declare class DatabaseManager implements IDatabaseManager {
    private initialized;
    initNoDb(context: IContext, ...schemas: JsonSchemaWithLastIds[]): Promise<void>;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchemaWithLastIds[]): Promise<void>;
    isInitialized(): boolean;
    initFeatureSchemas(schemas: JsonSchemaWithLastIds[], context: IContext, buildSchemas: boolean): Promise<void>;
    private initTerminal;
    private installAirportSchema;
}
//# sourceMappingURL=DatabaseManager.d.ts.map