import { IContext } from '@airport/di';
import { IDatabaseManager } from '@airport/terminal-map';
import { JsonSchemaWithLastIds } from '@airport/security-check';
export declare class DatabaseManager implements IDatabaseManager {
    private initialized;
    initNoDb(context: IContext, ...schemas: JsonSchemaWithLastIds[]): Promise<void>;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    isInitialized(): boolean;
    initFeatureSchemas(context: IContext, jsonSchemas?: JsonSchemaWithLastIds[]): Promise<void>;
    private initTerminal;
    private installStarterSchema;
}
//# sourceMappingURL=DatabaseManager.d.ts.map