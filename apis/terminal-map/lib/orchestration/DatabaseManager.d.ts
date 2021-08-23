import { IContext } from "@airport/di";
import { JsonSchema } from "@airport/ground-control";
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext, ...schemas: JsonSchema[]): Promise<void>;
    initNoDb(context: IContext, ...schemas: JsonSchema[]): Promise<void>;
}
//# sourceMappingURL=DatabaseManager.d.ts.map