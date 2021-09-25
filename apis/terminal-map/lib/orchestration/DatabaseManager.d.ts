import { IContext } from "@airport/di";
import { JsonSchemaWithLastIds } from "@airport/security-check";
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    initNoDb(context: IContext, ...schemas: JsonSchemaWithLastIds[]): Promise<void>;
    initFeatureSchemas(context: IContext, jsonSchemas?: JsonSchemaWithLastIds[]): void;
}
//# sourceMappingURL=DatabaseManager.d.ts.map