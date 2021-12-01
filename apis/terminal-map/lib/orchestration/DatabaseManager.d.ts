import { IContext } from "@airport/di";
import { JsonApplicationWithLastIds } from "@airport/security-check";
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    initNoDb(context: IContext, ...applications: JsonApplicationWithLastIds[]): Promise<void>;
    initFeatureApplications(context: IContext, jsonApplications?: JsonApplicationWithLastIds[]): void;
}
//# sourceMappingURL=DatabaseManager.d.ts.map