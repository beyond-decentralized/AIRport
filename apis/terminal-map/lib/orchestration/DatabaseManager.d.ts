import { IContext } from "@airport/di";
import { JsonSchema } from "@airport/ground-control";
import { JsonSchemaWithLastIds } from "@airport/security-check";
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initNoDb(context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initFeatureSchemas(schemas: JsonSchemaWithLastIds[], context: IContext, buildSchemas: boolean): void;
}
//# sourceMappingURL=DatabaseManager.d.ts.map